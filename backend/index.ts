/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

// index.ts - backend

import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRouter from "./chatbot-server/api-chatbot/api";
import weatherRouter from "./client/api-weather/weather";
import mapRouter from "./client/api-map/map";
import routeRouter from "./client/api-route/route";

import authRouter from "./auth";
import { connectDB } from "./db";
import { loadVectorStore } from "./chatbot-server/api-chatbot/search";

import adminStatsRouter from "./client/api-admin/adminStats";
import adminContentRouter from "./client/api-admin/adminContent";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.237:3000",
      "http://localhost:3001",
      "http://192.168.1.237:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
  })
);

app.use(express.json());

// ====== ROUTES ======
app.use("/api/auth", authRouter);      // auth prefix /api/auth

app.use("/", chatRouter);
app.use("/api", weatherRouter);
app.use("/api", mapRouter);
app.use("/api", routeRouter);
app.use("/api", adminStatsRouter);
app.use("/api", adminContentRouter);

// ====== START SERVER ======
const PORT = process.env.PORT || 4000;

async function startServer() {
  // 1) Kết nối MongoDB (nếu lỗi thì chỉ log, không kill server)
  await connectDB();

  // 2) Load vector store (nếu lỗi cũng chỉ log, không kill server)
  try {
    await loadVectorStore(); // nếu loadVectorStore không async thì vẫn OK
    console.log("✅ Đã load vector store");
  } catch (err) {
    console.error("⚠️ Lỗi load vector store:", err);
  }

  // 3) Nghe port
  app.listen(PORT, () => {
    console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
  });
}

startServer();
