// backend/chatbot-server/api-chatbot/search.ts

import fs from "fs";
import path from "path";

// Khai báo cho TypeScript biết __dirname tồn tại (runtime Node cung cấp)
declare const __dirname: string;

// ../rag_vector_store/vector_store.json
const VECTOR_PATH = path.join(__dirname, "..", "rag_vector_store", "vector_store.json");

// Định nghĩa kiểu cho từng phần tử trong vector store (nếu muốn dùng type)
export interface VectorItem {
  embedding: number[];
  text: string;
  [key: string]: any; // cho phép thêm field khác như id, source...
}

let VECTOR_STORE: VectorItem[] = [];

export function loadVectorStore(): void {
  if (!fs.existsSync(VECTOR_PATH)) {
    throw new Error("Không tìm thấy rag_vector_store/vector_store.json");
  }

  const raw = fs.readFileSync(VECTOR_PATH, "utf8");
  VECTOR_STORE = JSON.parse(raw);

  console.log("Đã load vector store:", VECTOR_STORE.length, "mẫu.");
}

export function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;

  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }

  if (na === 0 || nb === 0) return 0;

  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function semanticSearch(
  queryEmbedding: number[],
  topK: number = 3
): (VectorItem & { score: number })[] {
  return VECTOR_STORE
    .map((v) => ({
      ...v,
      score: cosine(queryEmbedding, v.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
