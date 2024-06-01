# README

## Repositories: https://github.com/tantan2703/NT208

## A. Giới thiệu

Đây là đồ án môn NT208 - Lập trình ứng dụng web

**Thành viên**

    - Võ Thiên An - 20520378

    - Lý Kiều Chí - 20521131

    - Đoàn Bảo Long - 21520332

    - Thiều Minh Viên - 22521661

    - Phạm Nguyễn Tất Đạt - 22520229

**Project: Watch shop**

**Các công nghệ sử dụng**

    - React JS: https://react.dev/

    - Express JS: https://expressjs.com/

    - MongoDB: https://www.mongodb.com/docs/

    - Socket.io: https://socket.io/docs/v4/

    - Paypal: https://developer.paypal.com/docs/api/overview/

    - Python: https://www.python.org/

    - Tensorflow: https://www.tensorflow.org/

    - Keras: https://keras.io/

    - Flask: https://flask.palletsprojects.com/en/2.1.x/

## B. Chức năng trang web

**Sơ đồ**
(https://www.mindmeister.com/app/map/3185286379?t=Evq4KLqB6k)

**Domnain Deploy**
https://deploynt208frontend.onrender.com

Tài khoản test:

        - User:
            - email: long@gmail.com
            - password: 123
    
        - Admin:
            - email: admin
            - password: admin

(Không có ImageSearchService, vì mô hình nặng)

**Các chức năng**

    Trang admin:
        - Chat with user
        - View purchase_order
        - View Watch, Add/Remove/Edit Watch

    Watch Shop:
        - Watch: Search, View Watches, Filter, Related Watches, Search by Image, Search by Text
        - User:
            - View & change user info, Authentication, change password, Chat with admin
            - Add/Remove/Edit watches to/from cart
            - Add watches from cart to purchase_order, Choose Watches from cart to payment: Paypal
            - Tài khoản test Paypal:
                - email: sb-msgne30855276@personal.example.com
                - password: nFzc9.Vy

**Run Local**
Setup MongoDB:

    Tải và cài đặt MongoDB Community Server
        - https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.9-signed.msi

    Setup Frontend và Backend:
        - Mở terminal cho mỗi thư mục frontend và backend, sau đó chạy lệnh npm i để cài đặt các package cần thiết.

    Setup ImageSearchService:

        - Mở terminal trong thư mục ImageSearchService
        - 1. Tạo Python Environment 3.10
        - python -m venv ./venv
        - 2. Kích hoạt môi trường
        - . ".\venv\Scripts\Activate.ps1"
        - 3. Cài đặt các Package cần thiết
        - pip install -r requirements.txt

     Setup AddSampleWatches:

        - Mở terminal trong thư mục AddSampleWatches
        - 1. Tạo Python Environment 3.10
        - python -m venv ./venv
        - 2. Kích hoạt môi trường
        - . ".\venv\Scripts\Activate.ps1"
        - 3. Cài đặt các Package cần thiết
        - pip install -r requirements.txt

    Khởi chạy Backend:
        - Chạy Backend: Mở terminal trong thư mục backend chạy lệnh node index.js
        - Tạo Admin: GET http://localhost:4000/adminsignup

    Thêm dữ liệu đồng hồ:
        - Mở terminal trong thư mục AddSampleWatches. Kich hoạt môi trường Python và chạy lệnh: python add_product.py

    Chạy ImageSearchService:
        -Mở terminal trong thư mục ImageSearchService. Kich hoạt môi trường Python và chạy lệnh: python offline.py Sau đó chạy lệnh: python server.py

    Chạy Frontend:
        -Mở terminal trong thư mục frontend chạy lệnh npm start

        Đăng nhập vào tài khoản admin:
            - email: admin
            - password: admin

## C. Các chức năng làm tiêu chí cộng điểm

Sử dụng mô hình Trích xuất/Truy xuất đặc trưng

    - Tìm kiếm sản phẩm bằng hình ảnh

![Image Search Example](ImageForReadme\imageSearchExample.png)

    - Related Watches

![Related Watch Example](ImageForReadme\relatedWatchExample.png)

Sử dụng Websocket

    - Chat giữa admin và user

![Chat Example](ImageForReadme\adminChatExample.png)

    - Chat giữa user và admin

![Chat Example](ImageForReadme\userChatExample.png)

Sử dụng API của Paypal

    - Thanh toán qua Paypal

![Paypal Example](ImageForReadme\paypalExample.png)
