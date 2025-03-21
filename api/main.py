from typing import List, Tuple

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load the demo data
DEMO_TSNE = np.load("demo-tsne.npy")
DEMO_Y = np.load("demo-y.npy")


class PointsRequest(BaseModel):
    epsilon: float


class Point(BaseModel):
    x: float
    y: float
    label: int


class PrototypeResponse(BaseModel):
    points: List[Point]
    prototypes: List[Point]
    accuracy: float


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


@app.get("/api/py/")
def read_root():
    return {"message": "DPPL Demo API"}


@app.post("/api/py/generate", response_model=PrototypeResponse)
def generate_points(request: PointsRequest):
    # Convert TSNE and labels to Point objects
    points = [
        Point(x=float(x), y=float(y), label=int(label))
        for (x, y), label in zip(DEMO_TSNE, DEMO_Y)
    ]

    prototypes, accuracy = select_prototypes(points, request.epsilon)
    return PrototypeResponse(points=points, prototypes=prototypes, accuracy=accuracy)
