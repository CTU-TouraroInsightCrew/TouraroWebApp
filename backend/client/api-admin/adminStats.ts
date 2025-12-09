/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

// backend/client/api-admin/adminStats.ts
import { Router, Request, Response } from "express";
import User from "../../models/User";

const router = Router();

// ========== STATS ==========
router.get("/admin/stats", async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments({});
    const activeGuides = await User.countDocuments({ role: "admin" });

    return res.json({ totalUsers, activeGuides });
  } catch (err) {
    console.error("Lỗi admin stats:", err);
    return res.status(500).json({ error: "Không lấy được thống kê admin" });
  }
});

// ========== USER LIST ==========
router.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      // ✅ thêm isActive để frontend nhận được
      "name email provider role createdAt isActive"
    ).sort({ createdAt: -1 });

    return res.json(users);
  } catch (err) {
    console.error("Lỗi admin users:", err);
    return res
      .status(500)
      .json({ error: "Không lấy được danh sách người dùng" });
  }
});

// ========== UPDATE USER STATUS (ACTIVE / INACTIVE) ==========
router.patch(
  "/admin/users/:id/status",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (typeof isActive !== "boolean") {
        return res.status(400).json({ error: "isActive phải là boolean" });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      ).select("name email provider role createdAt isActive");

      if (!user) {
        return res.status(404).json({ error: "Không tìm thấy user" });
      }

      return res.json(user);
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái user:", err);
      return res
        .status(500)
        .json({ error: "Không cập nhật được trạng thái người dùng" });
    }
  }
);

// ========== DANH SÁCH HƯỚNG DẪN VIÊN ==========
router.get("/admin/guides", async (req: Request, res: Response) => {
  try {
    const guides = await User.find(
      { role: "guide" }, // lưu ý: model hiện mới có "user" | "admin"
      "name email provider role createdAt isActive"
    ).sort({ createdAt: -1 });

    return res.json(guides);
  } catch (err) {
    console.error("Lỗi admin guides:", err);
    return res
      .status(500)
      .json({ error: "Không lấy được danh sách hướng dẫn viên" });
  }
});

export default router;
