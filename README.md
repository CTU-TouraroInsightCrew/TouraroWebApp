# TouraroWebApp
Touraro là một dự án web được xây dựng nhằm cung cấp trải nghiệm du lịch hiện đại cho người dân và du khách tại thành phố Cần Thơ.

Mục tiêu của dự án là giúp du khách khám phá Cần Thơ dễ dàng hơn và hỗ trợ người dân cập nhật các thông tin hữu ích theo thời gian thực.

Dự án được thực hiện trong cuộc thi [Phần Mềm Nguồn Mở-Olympic Tin học Sinh viên Việt Nam 2025]([https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F]). Được được open source theo giấy phép [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) bởi đội tác giả CTU-TouraroInsightCrew.

Để biết thêm chi tiết về cuộc thi, bạn có thể xem tại [đây]([https://vfossa.vn/thong-bao/de-thi-phan-mem-nguon-mo-olp-2025-749.html]).



## 🔎 Danh Mục

1. [Giới Thiệu](#giới-Thiệu)
2. [Chức Năng](#chức-năng-chính)
3. [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Hướng dẫn cài đặt dự án](#hướng-dẫn-cài-đặt-dự-án)
6. [Đóng góp cho dự án](#đóng-góp-cho-dự-án)
7. [Liên hệ](#liên-hệ)
8. [License](#license)


## Giới Thiệu


## Chức năng chính

1. Bản đồ du lịch (OpenStreetMap)
- Hiển thị các điểm đến nổi bật của hệ thống du lịch Cần Thơ kèm chức năng chỉ đường thông minh. 
- Chế độ xem trực quan, hỗ trợ zoom/pan.

2. Tích hợp thời tiết theo thời gian thực (OpenWeather)
- Nhiệt độ, độ ẩm, điều kiện thời tiết hiện tại\

3. Chatbot AI (du lịch + thông tin thành phố)
- Giải thích — gợi ý địa điểm du lịch
- Trả lời thông tin về triều cường, đường ngập, giao thông
- Gợi ý hành trình du lịch
- Tích hợp dữ liệu RAG nội bộ (địa điểm, ẩm thực, văn hóa, mùa vụ, các tuyến đường)
- Tích hợp mô hình AI thông qua API OpenAI


## Kiến trúc hệ thống
Hệ thống Touraro được xây dựng theo mô hình Full-Stack Web Application, bao gồm:
- Frontend: Next.js 16 + React (UI, bản đồ, giao diện chatbot)
- Backend: Express.js (API Gateway, xử lý truy vấn chatbot, lấy dữ liệu thời tiết, RAG)
- External Services: OpenAI API, OpenWeather API, OpenStreetMap Tiles
- Local Knowledge Base: Các file JSON + Vector Store cho chatbot

```
                         ┌─────────────────────────┐
                         │      Người dùng (UI)    │
                         └─────────────┬───────────┘
                                       │
                                       ▼
                        ┌─────────────────────────────┐
                        │     Frontend (Next.js)      │
                        │  - React UI                 │
                        │  - Bản đồ OSM (Leaflet)     │
                        │  - Chat UI + Streaming      │
                        └─────────────┬───────────────┘
                                      │ gọi API
                                      ▼
             ┌───────────────────────────────────────────────────┐
             │               Backend (Express.js)                │
             │---------------------------------------------------│
             │  • /chat/api  → gọi OpenAI + RAG + logic cảnh báo │
             │  • /weather     → lấy dữ liệu OpenWeather         │
             │  • /map         → xử lý dữ liệu map (nếu cần)     │
             │                                                   │
             │  **Thành phần Backend:**                          │
             │  - axios / node-fetch: gọi API ngoài              │
             │  - openai: giao tiếp mô hình AI                   │
             │  - dotenv: cấu hình môi trường                    │
             │  - cors: kết nối FE ↔ BE                          │
             │  - tsconfig-paths: hỗ trợ module alias (TS)       │
             └───────────────┬───────────────────────────────────┘
                             │
               sử dụng dữ liệu nội bộ
                             ▼
            ┌───────────────────────────────────────────────┐
            │      Local Vector Store + JSON RAG Store      │
            │  - json_data/ (địa điểm, ẩm thực, flooding…)  │
            │  - vector_store.pkl                           │
            │  - thuật toán search() để tìm ngữ cảnh        │
            └───────────────────────────────────────────────┘
                             │
                             ▼ lấy thêm thông tin
     ┌───────────────────────────────┐      ┌─────────────────────────┐
     │       OpenWeather API         │      │       OpenAI API        │
     │ (thời tiết, dự báo, cảnh báo) │      │ (sinh câu trả lời AI)   │
     └───────────────────────────────┘      └─────────────────────────┘

```

### Công nghệ sử dụng
1. Frontend — Next.js + React
Frontend chịu trách nhiệm hiển thị giao diện du lịch, bản đồ và chatbot.
Các thư viện chính:

| Nhóm chức năng              | Thư viện                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Giao diện**               | `next`, `react`, `react-dom`, `tailwind-merge`, `clsx`, `motion`                                        |
| **Biểu mẫu**                | `react-hook-form`, `@hookform/resolvers`, `zod`                                                         |
| **Bản đồ OSM + điều hướng** | `leaflet`, `react-leaflet`, `leaflet.markercluster`, `leaflet-routing-machine`, `react-leaflet-cluster` |
| **Hiệu ứng & UI**           | `lucide-react`, `swiper`, `@formkit/auto-animate`, `@radix-ui/react-*`                                  |
| **Xử lý markdown**          | `markdown-it`, `@types/markdown-it`                                                                     |
| **HTTP client**             | `axios`                                                                                                 |


Frontend đảm nhiệm:
- Render bản đồ Leaflet + OpenStreetMap tiles
- Hiển thị điểm du lịch, routing, clustering
- UI chatbot với animation mềm
- Gửi câu hỏi → backend → nhận câu trả lời streaming

2. Backend — Express.js
Backend là API Gateway chính, xử lý toàn bộ logic dữ liệu & AI.
| Chức năng           | Thư viện                    |
| ------------------- | --------------------------- |
| Server              | `express`                   |
| API calls           | `axios`, `node-fetch`       |
| AI                  | `openai`                    |
| Thời tiết           | OpenWeather API (qua axios) |
| Cấu hình môi trường | `dotenv`                    |
| Cross-origin        | `cors`                      |
| TS alias            | `tsconfig-paths`            |


Backend thực hiện:
- Nhận request từ frontend: `/chat/api`, `/weather`, …
- Gọi vector store để tìm ngữ cảnh RAG
- Gọi OpenAI để sinh câu trả lời
- Gọi OpenWeather lấy thời tiết thực tế
- Thêm cảnh báo triều cường, mưa lớn dựa trên thời tiết + tháng
- Trả kết quả hợp nhất về frontend

### RAG

Kiến trúc RAG của Touraro kết hợp khả năng truy xuất tri thức từ cơ sở dữ liệu JSON với sức mạnh của các mô hình embedding và mô hình ngôn ngữ lớn (LLM) của OpenAI. Khi người dùng đặt câu hỏi, hệ thống chuyển câu hỏi thành vector embedding, tìm ra các đoạn dữ liệu liên quan nhất từ vector store, kết hợp các thông tin về thời tiết / triều cường nếu cần, sau đó gửi toàn bộ ngữ cảnh cho mô hình LLM để tạo ra câu trả lời chính xác, tự nhiên và đúng với thực tế địa phương.

Hệ thống Chatbot du lịch Touraro sử dụng kiến trúc RAG (Retrieval-Augmented Generation) để bảo đảm câu trả lời:
- Chính xác dựa trên dữ liệu du lịch & đời sống tại Cần Thơ
- Không “bịa” thông tin ngoài CSDL
- Linh hoạt và có khả năng cập nhật linh hoạt tùy theo tình hình thực tế 


> **1. Câu hỏi người dùng**  
> ↓  
> **2. Chuyển thành embedding (OpenAI Embeddings)**  
> ↓  
> **3. Tìm kiếm trong Vector Store**  
> ↓  
> **4. Lấy các đoạn văn bản liên quan nhất (Top-k Contexts)**  
> ↓  
> **5. Ghép thêm dữ liệu thời tiết nếu có (OpenWeather + mùa vụ)**  
> ↓  
> **6. Tạo Prompt chứa toàn bộ ngữ cảnh**  
> ↓  
> **7. Mô hình OpenAI LLM sinh câu trả lời**  
> ↓  
> **8. Trả kết quả về Chat UI**

## Cấu trúc thư mục 
Dự án Touraro được tổ chức thành 3 phần chính: backend, frontend, và ragbot_data.

| Thư mục          | Vai trò                                        |
| ---------------- | ---------------------------------------------- |
| **backend/**     | Xử lý API, chatbot, thời tiết, RAG search      |
| **frontend/**    | Giao diện Next.js: bản đồ, chatbot, UI du lịch |
| **ragbot_data/** | Bộ dữ liệu JSON và code embed dữ liệu cho truy vấn chatbot  |


## Hướng dẫn cài đặt dự án
1. Clone dự án
```bash 
git clone https://github.com/CTU-TouraroInsightCrew/TouraroWebApp.git
```
2. Cài đặt Backend (Express.js)
Di chuyển vào thư mục `backend` và cài các thư viện cần thiết
```bash
npm install
```
Tạo file cấu hình môi trường .env 
```bash 
OPENAI_API_KEY=your_openai_key
RAG_MODEL=gpt-4o-mini #model hiện tại dự án đang sử dụng trong dự án
EMBED_MODEL=text-embedding-3-large  #model hiện tại dự án đang sử dụng trong dự án
CHAT_MODEL=gpt-4.1-mini #model hiện tại dự án đang sử dụng trong dự án
OPENWEATHER_API_KEY=your_openweather_key
PORT=4000
```
Chạy Server backend
```bash
npm start
```
Backend sẽ chạy tại `http://localhost:3000`

3. Cài đặt Frontend (Next.js 16)
Di chuyển vào thư mục `frontend` và cài đặt các dependencies
```bash
npm install
```
Chạy website frontend
```bash
npm run dev
```
Frontend sẽ chạy tại `http://localhost:3000`

4. Tạo Embedding cho dữ liệu RAG
Dữ liệu RAG nằm trong thư mục `ragbot_data/json_data/`
Bạn cần chạy script tạo vector store bằng OpenAI Embeddings.
Code được đặt trong `/ragbot_data/script/embed.js`
Sau khi hoàn tất, truy cập `http://localhost:3000` và vào mục Chat để kiểm tra kết quả.

## Đóng góp cho dự án 

Mọi đóng góp của các bạn đều được trân trọng, đừng ngần ngại gửi pull request cho dự án.

## Liên hệ 
- Thanh Nhi Coconut

## License
