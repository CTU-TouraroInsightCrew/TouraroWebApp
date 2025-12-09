
Hệ thống Touraro được xây dựng theo mô hình Full-Stack Web Application, bao gồm:
- Frontend: Next.js 16 + React (UI, bản đồ, giao diện chatbot)
- Backend: Express.js (API Gateway, xử lý truy vấn chatbot, lấy dữ liệu thời tiết, RAG)
- External Services: OpenAI API, OpenWeather API, OpenStreetMap Tiles
- Local Knowledge Base: Các file JSON + Vector Store cho chatbot


| Thành phần | Mô tả | Công nghệ / API |
|-----------|-------|------------------|
| **Người dùng (UI)** | Giao diện người dùng cuối | Web UI |
| **Frontend (Next.js)** | Hiển thị giao diện, bản đồ, chat streaming | React, Next.js, Leaflet |
| **Backend (Express.js)** | API Gateway xử lý toàn bộ logic dữ liệu & AI | Express.js, Axios, node-fetch, OpenAI SDK, dotenv, CORS, tsconfig-paths |
| **Đường dẫn API Backend** | Các endpoint chính | `/chat/api`, `/weather`, `/map` |
| **Local Vector Store + JSON RAG Store** | Lưu dữ liệu địa điểm, ẩm thực, flooding… và vector để tìm kiếm ngữ cảnh | `json_data/`, `vector_store.pkl`, custom `search()` |
| **OpenWeather API** | Lấy dữ liệu thời tiết, dự báo, cảnh báo | OpenWeather API |
| **OpenAI API** | Sinh câu trả lời AI + RAG | OpenAI GPT Models |


Sơ đồ tổng quan của phần mềm

<img src="images/diagram-web.webp" alt="System Architecture" width="100%" />


---