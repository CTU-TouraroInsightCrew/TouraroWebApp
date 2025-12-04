// backend/index.ts
import "dotenv/config";  // cách ngắn gọn nhất, nằm trên cùng file

import express from "express";
import cors from "cors";

import chatRouter from "./chatbot-server/api-chatbot/api";
import weatherRouter from "./client/api-weather/weather";
import mapRouter from "./client/api-map/map";
import routeRouter from "./client/api-route/route";
import { loadVectorStore } from "./chatbot-server/api-chatbot/search";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.237:3000"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// 🔥 lúc này process.env đã có OPENAI_API_KEY
loadVectorStore();

// gắn router như trước
app.use("/", chatRouter);
app.use("/api", weatherRouter);
app.use("/api", mapRouter);
app.use("/api", routeRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
});
