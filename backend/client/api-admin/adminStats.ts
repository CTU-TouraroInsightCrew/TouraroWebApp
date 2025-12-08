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
      "name email provider role createdAt"
    ).sort({ createdAt: -1 });

    return res.json(users);
  } catch (err) {
    console.error("Lỗi admin users:", err);
    return res.status(500).json({ error: "Không lấy được danh sách người dùng" });
  }
});

// ========== DANH SÁCH HƯỚNG DẪN VIÊN ==========
router.get("/admin/guides", async (req: Request, res: Response) => {
  try {
    const guides = await User.find(
      { role: "guide" },                 // chỉ lấy guide
      "name email provider role createdAt"
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