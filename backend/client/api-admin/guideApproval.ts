/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

// backend/client/api-admin/guideApproval.ts
import { Router, Request, Response, NextFunction } from "express";
import GuideApplication from "../../models/GuideApplication";
import User from "../../models/User";
import { authMiddleware } from "../../auth";

const router = Router();

// Kiểu Request sau khi qua authMiddleware
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "user" | "guide" | "admin";
  };
}

// Middleware: chỉ cho admin thao tác
function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin được phép thao tác." });
  }
  next();
}

/**
 * GET /api/admin/guide-applications
 * Lấy danh sách hồ sơ đăng ký làm hướng dẫn viên
 * Query optional: ?status=pending|approved|rejected
 */
router.get(
  "/admin/guide-applications",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const { status } = req.query;

      const filter: any = {};
      if (status && typeof status === "string") {
        filter.status = status;
      }

      const apps = await GuideApplication.find(filter)
        .sort({ createdAt: -1 })
        .populate("userId", "name email role isActive");

      return res.json(apps);
    } catch (err) {
      console.error("Lỗi lấy danh sách hồ sơ guide:", err);
      return res
        .status(500)
        .json({ message: "Không lấy được danh sách hồ sơ hướng dẫn viên" });
    }
  }
);

/**
 * PATCH /api/admin/guide-applications/:id/approve
 * Admin duyệt hồ sơ → set status=approved + update user thành guide
 */
router.patch(
  "/admin/guide-applications/:id/approve",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const appDoc = await GuideApplication.findById(id);
      if (!appDoc) {
        return res.status(404).json({ message: "Không tìm thấy hồ sơ" });
      }

      if (appDoc.status === "approved") {
        return res
          .status(400)
          .json({ message: "Hồ sơ này đã được duyệt trước đó." });
      }

      // Cập nhật trạng thái hồ sơ
      appDoc.status = "approved";
      await appDoc.save();

      // Cập nhật user thành guide
      const user = await User.findById(appDoc.userId);
      if (user) {
        user.role = "guide";
        user.isGuideApproved = true;

        // Option: copy thêm thông tin từ hồ sơ sang user nếu muốn
        // Chỉ copy nếu user chưa có
        if (!user.avatarUrl && appDoc.avatarUrl) {
          user.avatarUrl = appDoc.avatarUrl;
        }
        if (!user.name && appDoc.name) {
          user.name = appDoc.name;
        }

        await user.save();
      }

      return res.json({
        message: "Đã duyệt hồ sơ hướng dẫn viên",
        application: appDoc,
      });
    } catch (err) {
      console.error("Lỗi duyệt hồ sơ guide:", err);
      return res
        .status(500)
        .json({ message: "Không duyệt được hồ sơ hướng dẫn viên" });
    }
  }
);

/**
 * PATCH /api/admin/guide-applications/:id/reject
 * Admin từ chối hồ sơ → set status=rejected
 */
router.patch(
  "/admin/guide-applications/:id/reject",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const appDoc = await GuideApplication.findById(id);

      if (!appDoc) {
        return res.status(404).json({ message: "Không tìm thấy hồ sơ" });
      }

      if (appDoc.status === "rejected") {
        return res
          .status(400)
          .json({ message: "Hồ sơ này đã bị từ chối trước đó." });
      }

      appDoc.status = "rejected";
      await appDoc.save();

      // Có thể reset cờ trên user nếu cần:
      // const user = await User.findById(appDoc.userId);
      // if (user) {
      //   user.isGuideApproved = false;
      //   if (user.role === "guide") user.role = "user";
      //   await user.save();
      // }

      return res.json({
        message: "Đã từ chối hồ sơ hướng dẫn viên",
        application: appDoc,
      });
    } catch (err) {
      console.error("Lỗi từ chối hồ sơ guide:", err);
      return res
        .status(500)
        .json({ message: "Không từ chối được hồ sơ hướng dẫn viên" });
    }
  }
);

export default router;
