import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VECTOR_PATH = path.join(__dirname, "..", "data", "vector_store.json");

let VECTOR_STORE = [];

export function loadVectorStore() {
  if (!fs.existsSync(VECTOR_PATH)) {
    throw new Error("Không tìm thấy data/vector_store.json");
  }

  VECTOR_STORE = JSON.parse(fs.readFileSync(VECTOR_PATH, "utf8"));
  console.log("📌 Đã load vector store:", VECTOR_STORE.length, "mẫu.");
}

export function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function semanticSearch(queryEmbedding, topK = 3) {
  return VECTOR_STORE
    .map(v => ({
      ...v,
      score: cosine(queryEmbedding, v.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

//trên server:
//import { loadVectorStore } from "./search.js";
//loadVectorStore() tải vector lên server khi khởi chạy