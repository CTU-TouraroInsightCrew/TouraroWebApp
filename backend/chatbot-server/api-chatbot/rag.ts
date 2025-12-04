// backend/chatbot-server/api-chatbot/rag.ts
import OpenAI from "openai";
// Nếu search vẫn là file JS thì giữ .js
// Nếu bạn đổi search.js -> search.ts thì sửa lại thành "./search"
import { semanticSearch } from "./search";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getCurrentTimeVN(): string {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function askRAG(question: string): Promise<string> {
  const now = getCurrentTimeVN();

  // 1) Embed câu hỏi
  const emb = await client.embeddings.create({
    model: process.env.EMBED_MODEL as string,
    input: question,
  });

  const qEmbedding = emb.data[0].embedding;

  // 2) Semantic search
  const contexts = semanticSearch(qEmbedding, 3);

  const contextText = contexts
    .map((c: any, i: number) => `[#${i + 1}] ${c.text}`)
    .join("\n---\n");

  // 3) Prompt tổng
  const prompt = `
Bạn là chatbot du lịch Cần Thơ.
Hôm nay là ${now}.
Chỉ trả lời dựa trên dữ liệu RAG dưới đây.
Nếu không có thông tin → trả lời: "Mình chưa có thông tin cho nội dung này." và gợi ý người dùng hỏi câu khác cụ thể hơn.
Nếu đang là mùa mưa hoặc mùa ngập (theo thông tin so sánh từ thời gian thực và dữ liệu đã có):
  + Khi gợi ý địa điểm → thêm 1 câu “Lưu ý trời có thể mưa, nên mang áo mưa/gù chống nước.”
  + Khi gợi ý đi chợ nổi hoặc di chuyển bằng thuyền → nhắc “ưu tiên đi buổi sáng, tránh mưa lớn bất chợt.”
  + Khi gợi ý lịch trình buổi tối → thêm “một số tuyến đường có thể ngập nhẹ khi triều cường.”
Chỉ chèn cảnh báo nhẹ nhàng, không làm rối người dùng.
Khi gợi ý nhiều lựa chọn (ví dụ địa điểm, món ăn):
  + Hãy cố gắng đưa ra danh sách tối đa khoảng 5 gợi ý, mỗi gợi ý có mô tả ngắn gọn.


DỮ LIỆU RAG:
${contextText}

CÂU HỎI:
${question}
`;

  // 4) Gọi OpenAI – cast sang any để truy cập output linh hoạt
  const resp: any = await client.responses.create({
    model: process.env.CHAT_MODEL as string,
    input: prompt,
  });

  const answer: string =
    resp?.output?.[0]?.content?.[0]?.text ??
    "Mình chưa nhận được phản hồi từ mô hình.";

  return answer;
}
