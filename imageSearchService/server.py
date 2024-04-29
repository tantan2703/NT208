import numpy as np
from PIL import Image
from feature_extractor import FeatureExtractor
from datetime import datetime
from flask import Flask, json, request, render_template, jsonify
from pathlib import Path
from pymongo import MongoClient
import ast
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client['WatchShop']
collection = db['watches']

# Read image features
fe = FeatureExtractor()
features = []
img_ids = []
for feature_path in Path("imageSearchService/static/feature").glob("*.npy"):
    features.append(np.load(feature_path))
    img_id = "/images/" + feature_path.stem + ".png"
    
    watch = collection.find_one({"image": img_id})

    img_ids.append(watch)
    
features = np.array(features)


@app.post("/imagesearch")
def index():
    print(request)
    file = request.files["query_img"]

    # Save query image
    img = Image.open(file.stream)  # PIL image
    uploaded_img_path = (
        "imageSearchService/static/uploaded/"
        + datetime.now().isoformat().replace(":", ".")
        + "_"
        + file.filename
    )
    img.save(uploaded_img_path)

    # Run search
    query = fe.extract(img)
    dists = np.linalg.norm(features - query, axis=1)  # L2 distances to features
    ids = np.argsort(dists)[:30]  # Top 30 results
    scores = [img_ids[id]['id'] for id in ids]
    return {"scores": scores}


if __name__ == "__main__":
    app.run(port=5001)