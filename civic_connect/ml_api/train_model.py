import os
from sklearn.cluster import KMeans
import numpy as np
import joblib


data = np.array([
    [23.0225, 72.5714],  # Ahmedabad
    [28.7041, 77.1025],  # Delhi
    [19.0760, 72.8777],  # Mumbai
    [13.0827, 80.2707],  # Chennai
    [22.5726, 88.3639],  # Kolkata
])


model = KMeans(n_clusters=3, random_state=42)
model.fit(data)


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


model_path = os.path.join(BASE_DIR, "ml_api", "ml_model.pkl")


joblib.dump(model, model_path)

print(f"Model saved successfully at: {model_path}")
