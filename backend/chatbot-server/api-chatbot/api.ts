// backend/chatbot-server/api-chatbot/api.ts
import { Router, Request, Response } from "express";
import { askRAG } from "./rag";

const router = Router();

router.post("/chat/api", async (req: Request, res: Response) => {
  try {
    const { question } = req.body as { question?: string };

    if (!question) {
      return res.status(400).json({ error: "Thiếu 'Câu hỏi'." });
    }

    const answer = await askRAG(question);

    return res.json({
      question,
      answer,
    });
  } catch (err) {
    console.error("Lỗi Chatbot:", err);
    return res
      .status(500)
      .json({ error: "Chatbot gặp lỗi. Vui lòng thử lại." });
  }
});

export default router;
