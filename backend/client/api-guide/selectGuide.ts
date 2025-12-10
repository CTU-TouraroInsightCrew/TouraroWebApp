/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

// backend/client/api-guide/selectGuide.ts
import { Router, Response } from "express";
import User from "../../models/User";
import { authMiddleware } from "../../auth";

const router = Router();

/**
 * POST /api/user/select-guide
 * Body: { guideId: string }
 * User chọn một hướng dẫn viên cho mình
 */
router.post(
  "/user/select-guide",
  authMiddleware,
  async (req: any, res: Response) => {
    try {
      const userId = req.user?.id as string | undefined;
      if (!userId) {
        return res.status(401).json({ message: "Chưa xác thực người dùng" });
      }

      const { guideId } = req.body || {};
      if (!guideId) {
        return res
          .status(400)
          .json({ message: "Thiếu guideId trong yêu cầu" });
      }

      // Kiểm tra guide tồn tại và đã được duyệt
      const guide = await User.findById(guideId);
      if (!guide || guide.role !== "guide" || !guide.isGuideApproved) {
        return res.status(400).json({
          message:
            "Hướng dẫn viên không hợp lệ hoặc chưa được admin duyệt.",
        });
      }

      // Cập nhật selectedGuide cho user
      const user = await User.findByIdAndUpdate(
        userId,
        { selectedGuide: guide._id },
        { new: true }
      ).select("name email role selectedGuide");

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy user" });
      }

      return res.json({
        message: "Đã chọn người hướng dẫn viên thành công.",
        user,
      });
    } catch (err) {
      console.error("Lỗi chọn hướng dẫn viên:", err);
      return res
        .status(500)
        .json({ message: "Lỗi server khi chọn hướng dẫn viên" });
    }
  }
);

export default router;
