import { Router, Request, Response } from "express";
import User from "../../models/User";

const router = Router();

/**
 * GET /api/guides
 * Lấy danh sách hướng dẫn viên đã được duyệt
 */
router.get("/guides", async (_req: Request, res: Response) => {
  try {
    const guides = await User.find({
      role: "guide",
      isGuideApproved: true,
      isActive: true,
    }).select("name email avatarUrl");

    return res.json(guides);
  } catch (err) {
    console.error("Get public guides error:", err);
    return res.status(500).json({ message: "Không lấy được danh sách guide" });
  }
});

export default router;
