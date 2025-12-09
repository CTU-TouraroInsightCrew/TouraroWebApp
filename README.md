# TouraroWebApp
<img src="./images/Banner.png" alt="Touraro Banner" width="100%">

**Touraro** là nền tảng web du lịch thông minh, giúp người dân và du khách khám phá **thành phố Cần Thơ** thông qua bản đồ số, thời tiết thời gian thực và chatbot AI.

Dự án tham gia cuộc thi **Phần Mềm Nguồn Mở – Olympic Tin học Sinh viên Việt Nam 2025**:  
🔗 https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F  
🔗 https://vfossa.vn/thong-bao/de-thi-phan-mem-nguon-mo-olp-2025-749.html  

Mã nguồn được phát hành theo giấy phép **GNU GPL v3.0**:  
🔗 https://www.gnu.org/licenses/gpl-3.0.en.html  



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
Touraro là một hệ thống du lịch thông minh được phát triển để nâng tầm trải nghiệm khám phá thành phố Cần Thơ. Ứng dụng kết hợp bản đồ số trực quan, dữ liệu thời tiết thời gian thực và chatbot AI để cung cấp thông tin toàn diện cho người dùng — từ điểm đến, ẩm thực, văn hoá cho đến giao thông và triều cường.

Không chỉ phục vụ du khách, Touraro còn tích hợp một bảng điều khiển dành cho quản trị viên, cho phép theo dõi tình trạng thời tiết – mực nước – lưu lượng giao thông, đồng thời quản lý người dùng, hướng dẫn viên và nội dung hiển thị trên nền tảng. Nhờ đó, hệ thống vận hành hiệu quả, cập nhật liên tục và dễ dàng mở rộng trong tương lai.

## Chức năng chính

1. Bản đồ du lịch (OpenStreetMap)
- Hiển thị các điểm đến nổi bật của hệ thống du lịch Cần Thơ kèm chức năng chỉ đường thông minh. 
- Chế độ xem trực quan, hỗ trợ zoom/pan.

2. Tích hợp thời tiết theo thời gian thực (OpenWeather)
- Nhiệt độ, độ ẩm, điều kiện thời tiết hiện tại

3. Chatbot AI (du lịch + thông tin thành phố)
- Giải thích — gợi ý địa điểm du lịch
- Trả lời thông tin về triều cường, đường ngập, giao thông
- Gợi ý hành trình du lịch
- Tích hợp dữ liệu RAG nội bộ (địa điểm, ẩm thực, văn hóa, mùa vụ, các tuyến đường)
- Tích hợp mô hình AI thông qua API OpenAI

4. Admin controlling
- Theo dõi thông số qua dashboard (gồm thời tiết, mực nước và lưu lượng giao thông)
- Quản lý người dùng
- Quản lý người hướng dẫn
- Quản lý nội dung trên web client


## Kiến trúc hệ thống
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

<img src="./images/diagram-web.webp" alt="System Architecture" width="100%">



### Công nghệ sử dụng
1. Frontend — Next.js + React
Frontend chịu trách nhiệm hiển thị giao diện du lịch, bản đồ và chatbot.
Các thư viện chính:

| Nhóm chức năng              | Thư viện                                                                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------------------          |
| **Giao diện**               | `next`, `react`, `react-dom`, `tailwind-merge`, `clsx`, `motion`                                                                                                         |
| **Biểu mẫu**                | `react-hook-form`, `@hookform/resolvers`, `zod`                                                                                                            |
| **Bản đồ OSM + điều hướng** | `leaflet`, `react-leaflet`, `leaflet.markercluster`, `leaflet-routing-machine`, `react-leaflet-cluster`                                                                                          |
| **Hiệu ứng & UI**           | `lucide-react`, `swiper`, `@formkit/auto-animate`, `@radix-ui/react-*`                                                                                                         |
| **Xử lý markdown**          | `markdown-it`, `@types/markdown-it`                                                                                                     |
| **HTTP client**             | `axios`                                                                                                          |


Frontend đảm nhiệm:
- Render bản đồ Leaflet + OpenStreetMap tiles
- Hiển thị điểm du lịch, routing, clustering
- UI chatbot với animation mềm
- Gửi câu hỏi → backend → nhận câu trả lời streaming

2. ## Backend — Express.js

Backend là API Gateway chính, xử lý toàn bộ logic dữ liệu & AI.

| Chức năng            | Thư viện / Công nghệ        |
|----------------------|------------------------------|
| Server               | express                      |
| API calls            | axios, node-fetch            |
| AI                   | openai                       |
| Thời tiết            | OpenWeather API (qua axios)  |
| Cấu hình môi trường  | dotenv                       |
| Cross-origin         | cors                         |
| TS alias             | tsconfig-paths               |


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

| Thư mục          | Vai trò                                                     |
| ---------------- | ----------------------------------------------              |
| **backend/**     | Xử lý API, chatbot, thời tiết, RAG search                   |
| **frontend/**    | Giao diện Next.js: bản đồ, chatbot, UI du lịch              |
| **ragbot_data/** | Bộ dữ liệu JSON và code embed dữ liệu cho truy vấn chatbot  |


## Hướng dẫn cài đặt dự án
1. Clone dự án
```bash 
git clone https://github.com/CTU-TouraroInsightCrew/TouraroWebApp.git
```
2. Cài đặt Backend (Express.js)
Di chuyển vào thư mục `backend` và cài các thư viện cần thiết
```bash
cd backend
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
npm run dev
```
Backend sẽ chạy tại `http://localhost:4000`

3. Cài đặt Frontend (Next.js 16)
Di chuyển vào thư mục `admin` và `client`. Cài đặt các dependencies

Với admin:
```bash
cd admin
npm install
```
Chạy website admin
```bash
npm run dev
```

Với client:
```bash
cd client
npm install
```
Chạy website client
```bash
npm run dev
```
- Client sẽ chạy tại `http://localhost:3000`
- Admin sẽ chạy tại `http://localhost:3001`

4. Tạo Embedding cho dữ liệu RAG
Dữ liệu RAG nằm trong thư mục `ragbot_data/json_data/`
Bạn cần chạy script tạo vector store bằng OpenAI Embeddings.
Code được đặt trong `/ragbot_data/script/embed.js`
Sau khi hoàn tất, truy cập `http://localhost:3000` và vào mục Chat để kiểm tra kết quả.

## Đóng góp cho dự án 

Chúng tôi hoan nghênh mọi đóng góp!
Pull Request / Issue tại:
🔗 [https://github.com/CTU-TouraroInsightCrew/TouraroWebApp](https://github.com/CTU-TouraroInsightCrew/TouraroWebApp/issues/new)

## Liên hệ 
📧 Email: socthanhnhi@gmail.com
 (Thạch Thanh Nhi)

## License
Dự án phát hành theo giấy phép GNU GPL v3.0
🔗 https://www.gnu.org/licenses/gpl-3.0.en.html
