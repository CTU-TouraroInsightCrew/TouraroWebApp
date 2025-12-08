import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRouter from "./chatbot-server/api-chatbot/api";
import weatherRouter from "./client/api-weather/weather";
import mapRouter from "./client/api-map/map";
import routeRouter from "./client/api-route/route";

import authRouter from "./auth";        // 👈 THÊM DÒNG NÀY
import { connectDB } from "./db";
import { loadVectorStore } from "./chatbot-server/api-chatbot/search";

import adminStatsRouter from "./client/api-admin/adminStats";
import adminContentRouter from "./client/api-admin/adminContent"; 

const app = express();



app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.237:3000"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

connectDB();
loadVectorStore();

// 👇 ĐẶT AUTH TRƯỚC CÁC ROUTER KHÁC CŨNG ĐƯỢC
app.use("/api/auth", authRouter);      // 👈 RẤT QUAN TRỌNG

app.use("/", chatRouter);
app.use("/api", weatherRouter);
app.use("/api", mapRouter);
app.use("/api", routeRouter);
app.use("/api", adminStatsRouter);
app.use("/api", adminContentRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
});
