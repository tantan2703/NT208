from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path
import numpy as np
import os


def train():
    fe = FeatureExtractor()

    for img_path in sorted(Path("../backend/upload/images").glob("*.png")):
        try:
            print(img_path)  # e.g., ./static/img/xxx.png
            feature = fe.extract(img=Image.open(img_path))

            # Tạo đường dẫn đến thư mục static/feature
            feature_dir = Path("static/feature")

            # Tạo đường dẫn cho file feature
            feature_path = feature_dir / (img_path.stem + ".npy")

            # Tạo thư mục nếu nó chưa tồn tại
            feature_dir.mkdir(parents=True, exist_ok=True)

            # Ghi đè feature lên file nếu nó đã tồn tại, hoặc tạo mới nếu chưa có
            np.save(feature_path, feature)
        except:
            continue

def train_image(image_filename):

    print(image_filename)

    image_path = "../backend/upload/images/" + image_filename

    try:
        fe = FeatureExtractor()
        feature = fe.extract(img=Image.open(image_path))
        feature_dir = Path("static/feature")
        feature_path = feature_dir / (image_filename.split('.')[0] + ".npy")
        feature_dir.mkdir(parents=True, exist_ok=True)
        np.save(feature_path, feature)
        print("Train_image success")
        return {"status": "success", "feature_path": feature_path}
    
    except:
        print("Train_image fail")
        return {"status": "fail"}
if __name__ == "__main__":
    train()