Dự án Touraro được tổ chức thành 4 phần chính: backend, admin, client, và ragbot_data.

Dưới đây là bảng cấu trúc

| Thư mục          | Vai trò                                                                 |
|------------------|-------------------------------------------------------------------------|
| **backend/**      | Xử lý API, chatbot AI, thời tiết, truy vấn RAG, tích hợp OpenAI + OWM. |
| **client/**       | Frontend Next.js dành cho người dùng: bản đồ du lịch, chatbot, UI chính. |
| **admin/**        | Frontend Next.js dành cho Admin: xem dashboard thời tiết – mực nước – giao thông, quản lý người dùng, người đăng ký hướng dẫn viên và nội dung Client. |
| **ragbot_data/**  | Chứa dữ liệu JSON, embeddings và scripts tạo vector store cho chatbot RAG. |

---
