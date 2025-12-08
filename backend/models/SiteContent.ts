import mongoose, { Schema, Document } from "mongoose";

export interface ISiteContent extends Document {
  key: string; // ví dụ "homepage"
  heroTitle: string;
  heroSubtitle: string;
  highlightTitle: string;
  highlightDescription: string;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true }, // "homepage"
    heroTitle: { type: String, default: "Khám phá Cần Thơ cùng Touraroo" },
    heroSubtitle: {
      type: String,
      default:
        "Trải nghiệm tour du lịch thông minh, kết hợp dữ liệu thời gian thực.",
    },
    highlightTitle: {
      type: String,
      default: "Tour nổi bật",
    },
    highlightDescription: {
      type: String,
      default: "Danh sách các tour được yêu thích và đề xuất cho du khách.",
    },
  },
  { timestamps: true }
);

const SiteContent =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContent;
