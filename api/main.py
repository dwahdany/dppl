from typing import List, Tuple

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class PointsRequest(BaseModel):
    epsilon: float
    n_points: int = 100


class Point(BaseModel):
    x: float
    y: float
    label: int


class PrototypeResponse(BaseModel):
    points: List[Point]
    prototypes: List[Point]
    accuracy: float


def generate_2d_clusters(n_points: int = 100) -> Tuple[List[Point], List[Point]]:
    # Generate two Gaussian clusters
    n_per_class = n_points // 2

    # Class 0: centered at (-1, -1)
    cluster1_x = np.random.normal(-1, 0.3, n_per_class)
    cluster1_y = np.random.normal(-1, 0.3, n_per_class)

    # Class 1: centered at (1, 1)
    cluster2_x = np.random.normal(1, 0.3, n_per_class)
    cluster2_y = np.random.normal(1, 0.3, n_per_class)

    points = []
    for x, y in zip(cluster1_x, cluster1_y):
        points.append(Point(x=float(x), y=float(y), label=0))
    for x, y in zip(cluster2_x, cluster2_y):
        points.append(Point(x=float(x), y=float(y), label=1))

    return points


def select_prototypes(points: List[Point], epsilon: float) -> Tuple[List[Point], float]:
    # Group points by label
    points_by_label = {0: [], 1: []}
    for p in points:
        points_by_label[p.label].append(p)

    prototypes = []
    for label in [0, 1]:
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
    points = generate_2d_clusters(request.n_points)
    prototypes, accuracy = select_prototypes(points, request.epsilon)
    return PrototypeResponse(points=points, prototypes=prototypes, accuracy=accuracy)
