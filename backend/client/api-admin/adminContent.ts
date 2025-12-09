/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

import { Router, Request, Response } from "express";
import SiteContent from "../../models/SiteContent";

const router = Router();

// GET /api/admin/content  → lấy content của homepage
router.get("/admin/content", async (req: Request, res: Response) => {
  try {
    let content = await SiteContent.findOne({ key: "homepage" });

    // Nếu chưa có thì tạo default
    if (!content) {
      content = await SiteContent.create({
        key: "homepage",
      });
    }

    return res.json(content);
  } catch (err) {
    console.error("Lỗi admin content (GET):", err);
    return res
      .status(500)
      .json({ error: "Không lấy được nội dung hiển thị client" });
  }
});

// PUT /api/admin/content  → cập nhật content
router.put("/admin/content", async (req: Request, res: Response) => {
  try {
    const { heroTitle, heroSubtitle, highlightTitle, highlightDescription } =
      req.body;

    const updated = await SiteContent.findOneAndUpdate(
      { key: "homepage" },
      {
        heroTitle,
        heroSubtitle,
        highlightTitle,
        highlightDescription,
      },
      { new: true, upsert: true }
    );

    return res.json(updated);
  } catch (err) {
    console.error("Lỗi admin content (PUT):", err);
    return res
      .status(500)
      .json({ error: "Không cập nhật được nội dung hiển thị client" });
  }
});

export default router;
