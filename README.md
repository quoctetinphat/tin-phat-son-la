# Tín Phát Sơn La

Website giới thiệu dịch vụ tư vấn du học, việc làm quốc tế và chương trình đào tạo của Tín Phát Sơn La.

## Cấu trúc dự án

```text
public/
  index.html              # Entry point triển khai
src/
  controllers/
    home-controller.js    # Điều phối tương tác và hành vi trang
  models/
    site-model.js         # Dữ liệu và cấu hình nghiệp vụ
  styles/
    main.css              # Giao diện và responsive styles
  views/
    home-view.js          # Truy cập các thành phần DOM của trang
backend/
  google-apps-script/
    Code.gs               # API ghi dữ liệu vào Google Sheets
```

## Chạy dự án

Mở [public/index.html](public/index.html) bằng trình duyệt. Với môi trường phát triển, nên phục vụ thư mục dự án bằng một web server tĩnh để module JavaScript hoạt động ổn định:

```text
python -m http.server 8080 --directory public
```

Sau đó truy cập `http://localhost:8080`.

## Lưu thông tin khách hàng

Form sử dụng Google Sheets thông qua Google Apps Script:

1. Tạo một Google Sheet mới.
2. Vào **Extensions → Apps Script**, dán nội dung từ `backend/google-apps-script/Code.gs`.
3. Chọn **Deploy → New deployment → Web app**.
4. Chọn chạy với tài khoản của bạn và quyền truy cập **Anyone**.
5. Sao chép URL Web app và gán vào `leadEndpoint` trong `src/models/site-model.js`.
6. Khi khách gửi form, dữ liệu sẽ nằm trong sheet `Khach hang`.

Không đưa mật khẩu hoặc thông tin đăng nhập Google vào mã nguồn. Chỉ chia sẻ URL Web app.
