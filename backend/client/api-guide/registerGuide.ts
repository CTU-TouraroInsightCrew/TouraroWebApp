/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

// backend/client/api-guide/registerGuide.ts
import { Router, Request, Response } from "express";
import User from "../../models/User";
import GuideApplication from "../../models/GuideApplication";   // 👈 THÊM
import { authMiddleware } from "../../auth";

const router = Router();

interface AuthUser {
  id: string;
  email: string;
  role: "user" | "guide" | "admin";
}

interface AuthRequest extends Request {
  user?: AuthUser;
}

/**
 * POST /api/guide/register
 * User gửi form đăng ký làm hướng dẫn viên
 */
router.post(
  "/guide/register",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Chưa xác thực người dùng" });
      }

      const userId = req.user.id;

      const {
        name,
        email,
        phone,
        address,
        experience,
        reason,
        avatarUrl,
      } = req.body || {};

      // Lấy user hiện tại
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy user" });
      }

      // Nếu user đã được duyệt guide rồi thì không cho đăng ký lại
      if ((user as any).guideStatus === "approved") {
        return res.status(400).json({
          message: "Bạn đã là hướng dẫn viên được duyệt. Không cần đăng ký lại.",
        });
      }

      // Nếu user đang chờ duyệt trên User
      if ((user as any).guideStatus === "pending") {
        return res.status(400).json({
          message:
            "Hồ sơ của bạn đang chờ duyệt. Vui lòng chờ admin xử lý.",
        });
      }

      // Kiểm tra trong collection GuideApplication:
      const existed = await GuideApplication.findOne({
        userId: user._id,
        status: { $in: ["pending", "approved"] },
      });

      if (existed) {
        return res.status(400).json({
          message:
            "Bạn đã có hồ sơ đăng ký đang chờ duyệt hoặc đã được duyệt. Vui lòng chờ admin xử lý.",
        });
      }

      const finalName = name || user.name;
      const finalEmail = email || user.email;

      if (!finalName || !finalEmail || !phone || !address) {
        return res.status(400).json({
          message:
            "Vui lòng nhập đầy đủ họ tên, email, số điện thoại và địa chỉ.",
        });
      }

      // 👉 Tạo document GuideApplication mới
      const appDoc = await GuideApplication.create({
        userId: user._id,
        name: finalName,
        email: finalEmail,
        phone,
        address,
        experience: experience || "",
        reason: reason || "",
        avatarUrl: avatarUrl || "",
        status: "pending",
      });

      // 👉 Đồng thời cập nhật vài flag trên User (tuỳ schema của bạn)
      (user as any).guideStatus = "pending";
      (user as any).isGuideApproved = false;
      await user.save();

      return res.json({
        message:
          "Đã gửi hồ sơ đăng ký làm hướng dẫn viên. Vui lòng chờ admin duyệt.",
        application: appDoc,
      });
    } catch (err) {
      console.error("Guide register error:", err);
      return res
        .status(500)
        .json({ message: "Lỗi server khi đăng ký làm hướng dẫn viên" });
    }
  }
);

export default router;
