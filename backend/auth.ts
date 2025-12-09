/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

// backend/auth.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

// helper tạo token
function signToken(user: any) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ===================
// Middleware check token + check isActive
// ===================
async function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    // ✅ Lấy lại user từ DB để kiểm tra isActive & role
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Nếu admin đã vô hiệu hóa tài khoản thì chặn luôn
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ admin." });
    }

    // gán user vào req để route phía sau dùng
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  } catch (e) {
    console.error("Auth error:", e);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ===================
// Đăng ký thường
// ===================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Missing name, email or password" });
    }

    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      provider: "credentials",
      role: "user", // admin thì set trực tiếp trong DB
      // isActive: true // default trong schema rồi
    });

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl ?? null,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ===================
// Đăng nhập thường
// ===================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email, provider: "credentials" });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Không cho login nếu tài khoản đã bị vô hiệu hóa
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ admin." });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl ?? null,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ===================
// Lấy thông tin chính mình
// ===================
router.get("/me", authMiddleware, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // (đến đây chắc chắn user đã isActive vì đã qua authMiddleware)
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl ?? null,
      isActive: user.isActive,
    });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ===================
// Cập nhật profile (tên, avatar)
// ===================
// PUT /api/auth/profile
router.put("/profile", authMiddleware, async (req: any, res) => {
  try {
    const { name, avatarUrl } = req.body;

    const update: any = {};
    if (name) update.name = name;
    if (avatarUrl) update.avatarUrl = avatarUrl;

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl ?? null,
      isActive: user.isActive,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
// Nếu muốn dùng middleware cho router khác:
export { authMiddleware };
