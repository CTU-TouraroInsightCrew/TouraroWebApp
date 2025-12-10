/*
 * This file is part of TouraroWebApp (Admin).
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TOKEN_KEY = "token"; // 🔑 phải trùng với localStorage.getItem("token") bên /admin/guide-applications

export default function AdminAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý đăng nhập admin...");

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("👉 ADMIN CALLBACK TOKEN:", token);

    if (!token) {
      setMessage("Không tìm thấy token. Vui lòng đăng nhập lại.");
      // Có thể redirect về trang login client sau vài giây nếu muốn
      // setTimeout(() => { window.location.href = "http://localhost:3000/sign-in"; }, 2000);
      return;
    }

    try {
      // Lưu token cho toàn bộ admin app
      localStorage.setItem(TOKEN_KEY, token);
      setMessage("Đăng nhập admin thành công. Đang chuyển hướng...");

      // Chuyển sang trang quản lý hồ sơ hướng dẫn viên
      router.replace("/admin/guide-applications");
    } catch (err) {
      console.error("👉 Lỗi khi lưu token admin:", err);
      setMessage("Không thể lưu token. Vui lòng thử lại.");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-xl border bg-card px-6 py-4 shadow">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
