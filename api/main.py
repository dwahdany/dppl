import os
from typing import List, Tuple

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Get the directory where the script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the demo data using absolute paths
DEMO_TSNE = np.load(os.path.join(SCRIPT_DIR, "demo-tsne.npy"))
DEMO_Y = np.load(os.path.join(SCRIPT_DIR, "demo-y.npy"))


def decay(
    cls: int | np.ndarray, max_samples: int, num_classes: int, ratio: float = 10
) -> int:
    """Calculate exponentially decaying number of samples per class."""
    decay_rate = -np.log(ratio) / num_classes
    return np.round(max_samples * np.exp(decay_rate * cls)).astype(int)


def give_imbalanced_set(
    x: np.ndarray, y: np.ndarray, imbalance_ratio: float = 10, seed: int = 42
):
    """Create an imbalanced dataset by subsampling classes exponentially."""
    classes = np.unique(y)
    X_classes = [x[y == i] for i in classes]
    rng = np.random.default_rng(seed)

    # Get current samples per class
    input_samples_per_class = np.asarray([(y == i).sum() for i in classes])

    # Calculate target samples per class with exponential decay
    output_samples_per_class = decay(
        np.linspace(0, len(classes), len(classes)),
        max_samples=input_samples_per_class.min(),
        num_classes=len(classes),
        ratio=imbalance_ratio,
    )

    # Shuffle the class sizes
    rng.shuffle(output_samples_per_class)

    # Subsample each class
    x_imbalanced = np.concatenate(
        [
            X_classes[i][:num_samples]
            for i, num_samples in enumerate(output_samples_per_class)
        ]
    )
    y_imbalanced = np.concatenate(
        [
            np.repeat(i, num_samples)
            for i, num_samples in enumerate(output_samples_per_class)
        ]
    )

    return x_imbalanced, y_imbalanced


class PointsRequest(BaseModel):
    epsilon: float
    imbalance_ratio: float


class Point(BaseModel):
    x: float
    y: float
    label: int


class PointsResponse(BaseModel):
    points: List[Point]
    prototypes: List[Point]
    accuracy: float
    balanced_accuracy: float


def select_prototypes(points: List[Point], epsilon: float) -> Tuple[List[Point], float]:
    # Group points by label
    points_by_label = {}
    for p in points:
        if p.label not in points_by_label:
            points_by_label[p.label] = []
        points_by_label[p.label].append(p)

    prototypes = []
    for label in points_by_label:
        class_points = points_by_label[label]
        if epsilon == float("inf"):
            # Without privacy, just use mean
            x_mean = sum(p.x for p in class_points) / len(class_points)
            y_mean = sum(p.y for p in class_points) / len(class_points)
            prototypes.append(Point(x=x_mean, y=y_mean, label=label))
        else:
            # With privacy, add Laplace noise to mean
            scale = 2.0 / (epsilon * len(class_points))  # sensitivity = 2/n
            x_mean = sum(p.x for p in class_points) / len(class_points)
            y_mean = sum(p.y for p in class_points) / len(class_points)
            x_noisy = x_mean + np.random.laplace(0, scale)
            y_noisy = y_mean + np.random.laplace(0, scale)
            prototypes.append(Point(x=float(x_noisy), y=float(y_noisy), label=label))

    # Compute accuracy
    correct = 0
    for point in points:
        # Find closest prototype
        min_dist = float("inf")
        pred_label = None
        for proto in prototypes:
            dist = (point.x - proto.x) ** 2 + (point.y - proto.y) ** 2
            if dist < min_dist:
                min_dist = dist
                pred_label = proto.label
        if pred_label == point.label:
            correct += 1

    accuracy = correct / len(points)
    return prototypes, accuracy


def calculate_accuracies(points, points_labels, prototypes, prototype_labels):
    # Calculate distances to all prototypes for each point
    distances = np.array(
        [np.sum((points - prototype) ** 2, axis=1) for prototype in prototypes]
    )

    # Predict labels based on closest prototype
    predicted_labels = prototype_labels[np.argmin(distances, axis=0)]

    # Calculate standard accuracy
    accuracy = np.mean(predicted_labels == points_labels)

    # Calculate balanced accuracy
    unique_labels = np.unique(points_labels)
    class_accuracies = []
    for label in unique_labels:
        mask = points_labels == label
        if np.any(mask):  # only calculate if we have points for this class
            class_acc = np.mean(predicted_labels[mask] == points_labels[mask])
            class_accuracies.append(class_acc)

    balanced_accuracy = np.mean(class_accuracies)

    return accuracy, balanced_accuracy


@app.get("/api/py/")
def read_root():
    return {"message": "DPPL Demo API"}


@app.post("/api/py/generate")
def generate_points(request: PointsRequest) -> PointsResponse:
    # Apply imbalance ratio to the data
    points_tsne, points_y = give_imbalanced_set(
        DEMO_TSNE, DEMO_Y, imbalance_ratio=request.imbalance_ratio, seed=42
    )

    # Group points by label
    unique_labels = np.unique(points_y)
    points_by_label = {label: points_tsne[points_y == label] for label in unique_labels}

    # Select prototypes based on epsilon
    prototypes_tsne = []
    prototypes_y = []

    for label, points in points_by_label.items():
        # Add Laplace noise to mean with sensitivity = 2/n
        prototype = np.mean(points, axis=0)
        scale = 2.0 / (request.epsilon * len(points))  # sensitivity = 2/n
        noise = np.random.laplace(0, scale, size=prototype.shape)
        prototype += noise

        prototypes_tsne.append(prototype)
        prototypes_y.append(label)

    # Calculate accuracies
    accuracy, balanced_accuracy = calculate_accuracies(
        points_tsne, points_y, np.array(prototypes_tsne), np.array(prototypes_y)
    )

    # Convert to response format
    points = [
        Point(x=float(x), y=float(y), label=int(label))
        for x, y, label in zip(points_tsne[:, 0], points_tsne[:, 1], points_y)
    ]

    # Convert prototypes list to numpy array for slicing
    prototypes_tsne = np.array(prototypes_tsne)
    prototypes = [
        Point(x=float(x), y=float(y), label=int(label))
        for x, y, label in zip(
            prototypes_tsne[:, 0], prototypes_tsne[:, 1], prototypes_y
        )
    ]

    return PointsResponse(
        points=points,
        prototypes=prototypes,
        accuracy=float(accuracy),
        balanced_accuracy=float(balanced_accuracy),
    )
