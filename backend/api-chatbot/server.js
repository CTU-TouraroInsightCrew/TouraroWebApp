import "dotenv/config";
import express from "express";
import cors from "cors";

import { loadVectorStore } from "./search.js";
import apiRouter from "./api.js";

const app = express();

app.use(cors());
app.use(express.json());

// Load vector khi server chạy
loadVectorStore();

// Mount API vào server
app.use("/", apiRouter);  // tức là /chat/api hoạt động ở đây

// Chạy server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server chatbot chạy tại http://localhost:${PORT}/chat/api`);
});
