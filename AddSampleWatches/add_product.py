import os
import requests
import pandas as pd
import time


# Đọc thông tin sản phẩm từ file CSV
def read_products_from_csv(csv_file):
    products = []
    df = pd.read_csv(csv_file)
    for index, row in df.iterrows():
        product = {
            "name": row["name"],
            "price": row["price"],
            "image": f"200 Watches/{index + 1}.png",
            "brand": row["brand"],
            "model": row["model"],
            "year": row["yop"],
            "sex": row["sex"],
            "size": row["size"],
            "available": True,
        }
        products.append(product)
    return products


# Upload hình ảnh lên server và lấy về URL
def upload_image(image_path):
    url = "http://localhost:4000/sampleupload"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    with open(image_path, "rb") as file:
        files = {"product": file}
        response = requests.post(url, files=files)
        data = response.json()
    return data.get("image_url")


# Thêm sản phẩm vào server
def add_product(product):
    url = "http://localhost:4000/sampleaddproduct"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    response = requests.post(url, headers=headers, json=product)
    data = response.json()
    if data.get("success"):
        print(f"Added product {product['name']} successfully")
    else:
        print(f"Failed to add product {product['name']}")


# Đường dẫn đến thư mục chứa hình ảnh
image_dir = "1000x1000 Resized Watches"
count = 0

# Đảm bảo thư mục tồn tại
if not os.path.exists(image_dir):
    os.makedirs(image_dir)

# Đọc thông tin sản phẩm từ file CSV
products = read_products_from_csv("Watches_10_each_brand.csv")

# Upload hình ảnh và thêm sản phẩm
for idx, product in enumerate(products):
    image_path = f"{image_dir}/{idx+1}.png"
    product["image"] = upload_image(image_path)
    add_product(product)
