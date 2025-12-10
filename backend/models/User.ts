/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider: "credentials" | "google";
  role: "user" | "guide" | "admin";   // ✅ đã thêm "guide"
  avatarUrl?: string;
  isActive: boolean;                  // trạng thái tài khoản

  // ✅ user này đã chọn hướng dẫn viên nào (nếu có)
  selectedGuide?: Types.ObjectId | null;

  // ✅ nếu user là guide: đã được admin duyệt hay chưa
  isGuideApproved?: boolean;

  guideStatus?: "none" | "pending" | "approved" | "rejected";
  guidePhone?: string;
  guideAddress?: string;
  guideExperience?: string;
  guideReason?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["user", "guide", "admin"],
      default: "user",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // user chọn hướng dẫn viên
    selectedGuide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ===== GUIDE FIELDS (BẮT BUỘC) =====
    isGuideApproved: {
      type: Boolean,
      default: false,
    },

    guideStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },

    guidePhone: { type: String, default: "" },
    guideAddress: { type: String, default: "" },
    guideExperience: { type: String, default: "" },
    guideReason: { type: String, default: "" },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
