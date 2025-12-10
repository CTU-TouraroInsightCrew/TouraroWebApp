/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/auth";

const defaultAvatar = "/images/default-avatar.jpg";

type GuideCard = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
};

async function selectGuide(guideId: string) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn cần đăng nhập để chọn người dẫn tour.");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/user/select-guide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ guideId }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Chọn hướng dẫn viên thất bại.");
      return;
    }

    alert("Đã chọn người hướng dẫn viên thành công!");
  } catch (err) {
    console.error(err);
    alert("Lỗi server khi chọn hướng dẫn viên.");
  }
}

export default function GuideSection() {
  const [guides, setGuides] = useState<GuideCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGuides() {
      try {
        setLoading(true);
        setError(null);

        // 👇 Gọi API public để lấy list guide
        const res = await fetch(`${BACKEND_URL}/api/guides`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("LOAD GUIDES ERROR:", text);
          throw new Error("Không lấy được danh sách hướng dẫn viên");
        }

        const data = await res.json();

        // ⚠️ Tùy backend trả gì, anh giả sử là:
        // [{ _id, name, email, phone, avatarUrl }]
        const mapped: GuideCard[] = data.map((g: any) => ({
          id: g._id,
          name: g.name,
          email: g.email,
          phone: g.phone || "",
          avatar: g.avatarUrl,
        }));

        setGuides(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Có lỗi khi load hướng dẫn viên");
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  return (
    <div id="guides-section" className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Tour Guides</h1>

      {error && (
        <p className="mb-4 text-red-500 text-sm">
          Lỗi: {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {loading && (
          <p className="text-gray-600">Đang tải danh sách hướng dẫn viên...</p>
        )}

        {!loading && guides.length === 0 && !error && (
          <p className="text-gray-600">
            Hiện chưa có hướng dẫn viên nào.
          </p>
        )}

        {guides.map((guide) => (
          <div
            key={guide.id}
            className="flex bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="w-1/3">
              <img
                src={guide.avatar || defaultAvatar}
                alt={guide.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-2/3 p-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">{guide.name}</h2>
              <p className="text-gray-600">Email: {guide.email}</p>
              <p className="text-gray-600">Phone: {guide.phone}</p>

              <button
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                onClick={() => selectGuide(guide.id)}
              >
                Chọn người dẫn tour
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
