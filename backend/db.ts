// backend/db.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // 👉 Lấy từ .env, không fallback local ở đây

export async function connectDB() {
  try {
    if (!MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env");
      // KHÔNG exit, để server vẫn chạy (các route không dùng DB vẫn ok)
      return;
    }

    // Nếu đã connect rồi thì khỏi connect nữa
    if (mongoose.connection.readyState === 1) {
      console.log("ℹ️ MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // ❌ ĐỪNG process.exit(1) nữa, để backend không bị tắt
    // Có thể giữ nguyên cho dev:
    // console.error("❌ Continue running server without DB connection");
  }
}
