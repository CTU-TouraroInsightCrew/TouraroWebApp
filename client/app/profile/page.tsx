/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  if (!user && !loading) {
    return (
      <div className="wrapper py-10">
        <p>Bạn cần đăng nhập để xem trang này.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wrapper py-10">
        <p>Đang tải...</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, avatarUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Cập nhật thất bại");
        return;
      }

      setMessage("Đã cập nhật hồ sơ thành công!");
      await refreshUser();
    } catch (e) {
      setMessage("Lỗi server, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="wrapper py-10 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Hồ sơ cá nhân</h1>

      {message && <p className="mb-3 text-sm text-blue-600">{message}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input value={user?.email || ""} disabled />
        </div>

        <div>
          <label className="block text-sm mb-1">Tên hiển thị</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Avatar URL</label>
          <Input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="mt-2 w-20 h-20 rounded-full object-cover border"
            />
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0059B3] text-white"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </div>
  );
}
