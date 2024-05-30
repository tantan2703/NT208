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

## B. Sơ đồ chức năng trang web

**Sơ đồ**
(https://www.mindmeister.com/app/map/3185286379?t=Evq4KLqB6k)

**Function**

    Trang admin:

        - CRUD product

        - Feedback

    Watch Shop:
        - Watch: Search, view watch, Filter, Recommend
        - User: View & change user info, authentication, change password, forget password.
        - Cart: Add/Remove/Edit watches to/from cart, Add watches from cart to purchase_order, Choose Watches from cart to payment: Paypal
        - User_purchase_order
        - Chat room

**Run Local**
Setup MongoDB: - Tải và cài đặt MongoDB Community Server - https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.9-signed.msi

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

    Khởi chạy:
        - Chạy Backend: Mở terminal trong thư mục backend chạy lệnh node index.js
        - Tạo Admin: GET http://localhost:4000/adminsignup
        - Chạy ImageSearchService: Mở terminal trong thư mục ImageSearchService. Kich hoạt môi trường Python và chạy lệnh python offline.py Sau đó chạy lệnh python server.py
        - Chạy Frontend: Mở terminal trong thư mục frontend chạy lệnh npm start

    Tài khoản admin:
        - email: admin
        - password: admin


