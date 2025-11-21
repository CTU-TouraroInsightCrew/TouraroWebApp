import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data", "json_data");
const VECTOR_STORE_PATH = path.join(__dirname, "..","data", "vector_store.json");

const EMBED_MODEL = process.env.EMBED_MODEL || "text-embedding-3-small";

/**
 * Load tất cả file .json trong thư mục data/
 */
function loadJsonFiles(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const docs = [];

  for (const f of files) {
    const fullPath = path.join(dir, f);
    const raw = JSON.parse(fs.readFileSync(fullPath, "utf8"));

    if (Array.isArray(raw)) {
      raw.forEach((obj, idx) =>
        docs.push({
          ...obj,
          _sourceFile: f,
          _index: idx,
        })
      );
    } else {
      docs.push({
        ...raw,
        _sourceFile: f,
      });
    }
  }

  return docs;
}

/**
 * Chuyển object JSON thành text phẳng để embed
 */
function jsonToText(obj) {
  let parts = [];

  function walk(o, prefix = "") {
    for (const [key, value] of Object.entries(o)) {
      if (key.startsWith("_")) continue; // bỏ meta nội bộ

      const label = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, label);
      } else {
        parts.push(`${label}: ${value}`);
      }
    }
  }

  walk(obj);
  return parts.join("\n");
}

async function embedDocuments() {
  const docs = loadJsonFiles(DATA_DIR);
  console.log(`📄 Đọc được ${docs.length} document từ thư mục data/`);

  const vectorStore = [];

  for (const doc of docs) {
    const text = jsonToText(doc);

    // Gọi OpenAI embedding
    const emb = await client.embeddings.create({
      model: EMBED_MODEL,
      input: text,
    });

    const id =
      doc.id ||
      `${doc._sourceFile || "doc"}-${doc._index ?? 0}-${crypto.randomUUID()}`;

    vectorStore.push({
      id,
      metadata: {
        sourceFile: doc._sourceFile || null,
      },
      text,
      embedding: emb.data[0].embedding,
    });

    console.log("✅ Embedded:", id);
  }

  fs.writeFileSync(VECTOR_STORE_PATH, JSON.stringify(vectorStore, null, 2), {
    encoding: "utf8",
  });

  console.log(`💾 Đã lưu ${vectorStore.length} vector vào ${VECTOR_STORE_PATH}`);
}

embedDocuments().catch((err) => {
  console.error("❌ Lỗi khi embed:", err);
  process.exit(1);
});
