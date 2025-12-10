/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGuideApplication extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  reason: string;
  avatarUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const GuideApplicationSchema = new Schema<IGuideApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    experience: { type: String, default: "" },
    reason: { type: String, default: "" },

    avatarUrl: { type: String, default: "" },

    // trạng thái hồ sơ: chờ duyệt / đã duyệt / từ chối
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const GuideApplication =
  mongoose.models.GuideApplication ||
  mongoose.model<IGuideApplication>(
    "GuideApplication",
    GuideApplicationSchema
  );

export default GuideApplication;
