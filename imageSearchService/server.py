import numpy as np
from PIL import Image
import requests
from feature_extractor import FeatureExtractor
from datetime import datetime
from flask import Flask, json, request, render_template, jsonify
from pathlib import Path
from pymongo import MongoClient
from offline import train_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["WatchShop"]
collection = db["watches"]

# Read image features
fe = FeatureExtractor()
features = []
img_ids = []
for feature_path in Path("static/feature").glob("*.npy"):
    features.append(np.load(feature_path))
    img_id = "/images/" + feature_path.stem + ".png"

    watch = collection.find_one({"image": img_id})

    img_ids.append(watch)

print(len(img_ids))
print(len(features))


@app.post("/retrain")
def retrain():
    global features
    global img_ids

    image_filename = request.form["image_filename"]

    print(image_filename)
    train_result = train_image(image_filename)
    if train_result["status"] == "success":
        feature_path = train_result["feature_path"]

        img_id = "/images/" + image_filename

        print(img_id)

        watch = collection.find_one({"image": img_id})
        img_ids.append(watch)

        print(feature_path)

        features.append(np.load(feature_path))

        print("Retrain success")
        return {"status": "retrain success"}
    else:
        print("Train fail")
        return {"status": "retrain fail"}


@app.post("/imagesearch")
def index():
    global features
    global img_ids

    copy_features = features.copy()

    print(request.form)
    image_filename = request.form["query_img"]
    image_url = "http://localhost:4000/imagesearchstorage/" + image_filename

    # Fetch image from URL
    img = Image.open(requests.get(image_url, stream=True).raw)
    img = img.convert("RGB")
    img = img.resize((224, 224))

    # Save query image
    uploaded_img_path = (
        "static/uploaded/"
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
    for feature in copy_features:
        dists.append(np.linalg.norm(feature - query))
    dists = np.array(dists)
    print(dists)

    ids = np.argsort(dists)[:8]  # Top 30 results

    print(ids)

    scores = []

    for id in ids:
        try:
            print(id)
            print(img_ids[id])
            print(img_ids[id]["id"])
            scores.append(img_ids[id]["id"])
        except:
            print("Error", id)
            continue

    return {"scores": scores}


if __name__ == "__main__":
    app.run(port=5001)
