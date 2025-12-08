import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider: "credentials" | "google";
  role: "user" | "admin";
  avatarUrl?: string;   // ✅ chỉ cần string, không phải { type, default }
  isActive: boolean;    // ✅ thêm field trạng thái
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
      enum: ["user", "admin"],
      default: "user",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    // ✅ user còn active hay đã bị khóa
    isActive: {
      type: Boolean,
      default: true, // user mới tạo mặc định là đang hoạt động
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
