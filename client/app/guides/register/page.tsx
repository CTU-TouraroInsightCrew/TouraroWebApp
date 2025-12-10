/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { SetStateAction, useState, type FormEvent } from "react";
import { BACKEND_URL } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // nếu chưa có thì dùng <textarea> thường
import { useAuth } from "@/components/auth/auth-provider";

export default function GuideRegisterPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [reason, setReason] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="wrapper py-10">
        <p>Bạn cần đăng nhập để đăng ký làm hướng dẫn viên.</p>
      </div>
    );
  }

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!phone || !address) {
      setError("Vui lòng nhập đầy đủ số điện thoại và địa chỉ.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BACKEND_URL}/api/guide/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          experience,
          reason,
          avatarUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gửi hồ sơ thất bại, vui lòng thử lại.");
        return;
      }

      setMessage(data.message || "Đã gửi hồ sơ đăng ký thành công.");
    } catch (err: any) {
      console.error(err);
      setError("Lỗi server, vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper py-10 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">
        Đăng ký làm hướng dẫn viên
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Điền thông tin bên dưới để tham gia hệ thống Touraro với vai trò
        hướng dẫn viên. Admin sẽ xem xét và duyệt hồ sơ của bạn.
      </p>

      {message && (
        <div className="mb-3 text-sm text-green-700 bg-green-100 px-3 py-2 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Họ tên */}
        <div>
          <label className="block text-sm mb-1">Họ và tên</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên đầy đủ"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* SĐT */}
        <div>
          <label className="block text-sm mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0938 xxx xxx"
          />
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-sm mb-1">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ví dụ: Ninh Kiều, Cần Thơ"
          />
        </div>

        {/* Kinh nghiệm */}
        <div>
          <label className="block text-sm mb-1">
            Kinh nghiệm dẫn tour (nếu có)
          </label>
          <Textarea
            rows={3}
            value={experience}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setExperience(e.target.value)}
            placeholder="Ví dụ: 2 năm dẫn tour miền Tây, hiểu biết văn hóa địa phương..."
          />
        </div>

        {/* Lý do */}
        <div>
          <label className="block text-sm mb-1">
            Lý do muốn làm hướng dẫn viên
          </label>
          <Textarea
            rows={3}
            value={reason}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setReason(e.target.value)}
            placeholder="Chia sẻ ngắn gọn lý do, đam mê du lịch, giao tiếp..."
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-sm mb-1">Ảnh chân dung (URL)</label>
          <Input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover border"
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="bg-[#0059B3] text-white"
        >
          {submitting ? "Đang gửi..." : "Gửi hồ sơ đăng ký"}
        </Button>
      </form>
    </div>
  );
}
