import numpy as np
import joblib
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load the trained nearest neighbors model and district names
ml_model_path = os.path.join(BASE_DIR, "ml_api", "nearest_neighbors.pkl")  # Load ML Model
districts_path = os.path.join(BASE_DIR, "ml_api", "districts.pkl")  # Load Districts List

try:
    nn = joblib.load(ml_model_path)  # Load trained nearest neighbors model
    districts = joblib.load(districts_path)  # Load list of district names
except Exception as e:
    nn = None
    districts = None
    print(f"Error loading model: {e}")  # Print error for debugging

@api_view(["GET"])
def predict(request):
    if nn is None or districts is None:
        return Response({"error": "Model not loaded correctly"}, status=500)

    try:
        latitude = float(request.GET.get("latitude"))
        longitude = float(request.GET.get("longitude"))

        new_point = np.array([[latitude, longitude]])
        _, nearest_idx = nn.kneighbors(new_point)
        # nearest_district = districts[nearest_idx[0][0]]

        return Response({"nearest_district": nearest_idx[0][0]})

    except (TypeError, ValueError):
        return Response({"error": "Invalid input. Provide latitude and longitude as query parameters."}, status=400)
