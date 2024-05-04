import numpy as np
from PIL import Image
import requests
from feature_extractor import FeatureExtractor
from datetime import datetime
from flask import Flask, json, request, render_template, jsonify
from pathlib import Path
from pymongo import MongoClient
from offline import train
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

@app.get("/retrain")
def retrain():
    train()
    
    features = []
    img_ids = []
    for feature_path in Path("imageSearchService/static/feature").glob("*.npy"):
        features.append(np.load(feature_path))
        img_id = "/images/" + feature_path.stem + ".png"
    
        watch = collection.find_one({"image": img_id})

        img_ids.append(watch)
        
    features = np.array(features)
    return {"status": "success"}


@app.post("/imagesearch")
def index():
    print(request.form)
    image_filename = request.form["query_img"]
    image_url = 'http://localhost:4000/imagesearchstorage/' + image_filename

    # Fetch image from URL
    img = Image.open(requests.get(image_url, stream=True).raw)
    img = img.convert("RGB")
    img = img.resize((224, 224))

    
    # Save query image
    uploaded_img_path = (
        "imageSearchService/static/uploaded/"
        + datetime.now().isoformat().replace(":", ".")
        + "_"
        + image_filename
    )
    img.save(uploaded_img_path)

    # Run search
    query = fe.extract(img)

    # L2 distances to features
    dists = []
    # dists = np.linalg.norm(features - query, axis=(1, 2)) 
    for feature in features:
        dists.append(np.linalg.norm(feature - query))
    dists = np.array(dists)
    print(dists)
    
    ids = np.argsort(dists)[:30]  # Top 30 results

    print(ids)

    scores = [img_ids[id]['id'] for id in ids]
    return {"scores": scores}


if __name__ == "__main__":
    app.run(port=5001)
