// backend/db.ts
import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/touraroo";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // đã connect rồi
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
