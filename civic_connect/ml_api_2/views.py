import torch
import clip
import torch.nn.functional as F
from PIL import Image, ImageOps
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
import os
import numpy as np

# Set device and load CLIP model once at startup
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device)

# Define categories
categories = [
    "Infrastructure Issues",
    "Community Services",
    "Environmental Concerns",
    "Other"
]

# Precompute text embeddings for category labels using CLIP’s zero-shot approach.
input_tokens = clip.tokenize(categories).to(device)
with torch.no_grad():
    text_embeddings = model.encode_text(input_tokens).float()
    text_embeddings /= torch.norm(text_embeddings, dim=-1, keepdim=True)

def cosine_similarity(embedding, reference_embeddings):
    # Compute cosine similarity between batch embeddings and text embeddings
    similarities = F.cosine_similarity(embedding.unsqueeze(1), reference_embeddings.unsqueeze(0), dim=-1)
    return similarities  # Returns a tensor of shape [B, num_categories]

def classify_text(input_text):
    if not input_text:
        return "Other", 0.0
    
    input_token = clip.tokenize([input_text]).to(device)
    with torch.no_grad():
        input_embedding = model.encode_text(input_token).float()
        input_embedding /= torch.norm(input_embedding, dim=-1, keepdim=True)
        similarities = cosine_similarity(input_embedding, text_embeddings)
    
    max_index = torch.argmax(similarities, dim=-1).item()
    confidence = float(similarities[0, max_index].item())
    predicted_category = categories[max_index]
    return predicted_category, confidence

def classify_image(image_path, threshold=0.2, tta_runs=5):
    try:
        # Load the image and ensure it's in RGB format
        orig_image = Image.open(image_path).convert("RGB")
    except Exception as e:
        print(f"Error loading image: {e}")
        return "Other", 0.0

    # Generate augmented tensors for TTA
    augmented_tensors = []
    for _ in range(tta_runs):
        aug_image = orig_image.copy()
        # Apply random horizontal flip
        if np.random.rand() > 0.5:
            aug_image = ImageOps.mirror(aug_image)
        # Apply random rotation between -15 and 15 degrees
        angle = np.random.uniform(-15, 15)
        aug_image = aug_image.rotate(angle)
        # Preprocess and append tensor (without unsqueeze)
        augmented_tensors.append(preprocess(aug_image))
    
    # Stack all augmentations into a single batch
    batch_tensor = torch.stack(augmented_tensors).to(device)  # Shape: [tta_runs, C, H, W]

    with torch.no_grad():
        image_embeddings = model.encode_image(batch_tensor).float()  # Shape: [tta_runs, D]
        image_embeddings /= torch.norm(image_embeddings, dim=-1, keepdim=True)
        # Compute cosine similarity in batch; shape: [tta_runs, num_categories]
        similarities = cosine_similarity(image_embeddings, text_embeddings)
        # Average similarities across all augmentations; shape: [num_categories]
        avg_similarities = similarities.mean(dim=0)
    
    max_index = torch.argmax(avg_similarities).item()
    confidence = float(avg_similarities[max_index].item())
    
    # If the confidence is below threshold, classify as "Other"
    if confidence < threshold:
        return "Other", confidence
    else:
        return categories[max_index], confidence

# Unified API for text and image classification
class UnifiedClassificationAPI(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        text = request.data.get("text", "")
        image_file = request.FILES.get("image", None)

        text_category, text_confidence = classify_text(text) if text else ("Other", 0.0)
        image_category, image_confidence = "Other", 0.0

        if image_file:
            # Save the uploaded image temporarily
            temp_image_path = os.path.join(settings.BASE_DIR, "temp_image.jpg")
            with open(temp_image_path, "wb") as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
            
            # Process the image and classify it
            image_category, image_confidence = classify_image(temp_image_path)
            try:
                os.remove(temp_image_path)  # Clean up the temporary image file
            except Exception as e:
                print(f"Error removing temporary image: {e}")

        return Response({
            "text_category": text_category,
            "text_confidence": text_confidence,
            "image_category": image_category,
            "image_confidence": image_confidence
        })
