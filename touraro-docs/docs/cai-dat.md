# Hướng Dẫn Cài Đặt Dự Án

## Clone dự án

```bash
git clone https://github.com/CTU-TouraroInsightCrew/TouraroWebApp.git
```

## Cài đặt Backend (Express.js)

Di chuyển vào thư mục backend và cài các thư viện cần thiết:

```bash
cd backend
npm install
```

Tạo file cấu hình môi trường `.env` trong thư mục backend:

```bash
OPENAI_API_KEY=your_openai_key
RAG_MODEL=gpt-4o-mini             # model hiện tại dự án đang sử dụng
EMBED_MODEL=text-embedding-3-large # model embedding hiện tại
CHAT_MODEL=gpt-4.1-mini           # model chat hiện tại
OPENWEATHER_API_KEY=your_openweather_key
PORT=4000
```

Chạy server backend:

```bash
npm run dev
```

Backend sẽ chạy tại:

`http://localhost:4000`

## Cài đặt Frontend (Next.js 16)

Di chuyển vào thư mục `admin` và `client` để cài đặt các dependencies.

3.1. Admin

```bash
cd admin
npm install
npm run dev
```

Admin sẽ chạy tại:

```bash
http://localhost:3001
```

3.2. Client

```bash
cd client
npm install
npm run dev
```

Client sẽ chạy tại:

`http://localhost:3000`

## Tạo Embedding cho dữ liệu RAG

- Dữ liệu RAG nằm trong thư mục:

`ragbot_data/json_data/`

Bạn cần chạy script tạo vector store bằng OpenAI Embeddings.

Code được đặt trong:
`ragbot_data/script/embed.js`

Chạy script (ví dụ):

```bash
node ragbot_data/script/embed.js
```

Sau khi hoàn tất, truy cập:

`http://localhost:3000`

và vào mục Chat để kiểm tra kết quả.

---