// src/api.js
import express from "express";
import { askRAG } from "./rag.js";

const router = express.Router();


router.post("/chat/api", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Thiếu 'Câu hỏi'." });
    }

    const answer = await askRAG(question);

    res.json({
      question,
      answer
    });

  } catch (err) {
    console.error("Lỗi Chatbot:", err);
    res.status(500).json({ error: "Chatbot gặp lỗi. Vui lòng thử lại." });
  }
});

export default router;
