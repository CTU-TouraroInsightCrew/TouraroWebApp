/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

"use client";

import React from "react";

const defaultAvatar = "/images/default-avatar.jpg"; // Ảnh fallback mặc định

const guides = [
  {
    id: 1,
    name: "Thạch Thanh Nhi",
    email: "thanhni.tourguide@example.com",
    phone: "0938 112 457",
    avatar: "", // Không có ảnh → sẽ dùng avatar mặc định
  },
  {
    id: 2,
    name: "Trần Thị Phương Thảo",
    email: "phuongthao.guide@example.com",
    phone: "0907 321 889",
    avatar: "/images/guide2.jpg",
  },
  {
    id: 3,
    name: "Trần Tấn Thành",
    email: "tanthanh.tourguide@example.com",
    phone: "0964 552 776",
    avatar: "", // Không có → fallback
  },
];

export default function GuideSection() {
  return (
    <div id="guides-section" className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Tour Guides</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="flex bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Hình bên trái */}
            <div className="w-1/3">
              <img
                src={guide.avatar || defaultAvatar}
                alt={guide.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thông tin bên phải */}
            <div className="w-2/3 p-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">{guide.name}</h2>
              <p className="text-gray-600">Email: {guide.email}</p>
              <p className="text-gray-600">Phone: {guide.phone}</p>

              <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">
                Chọn người dẫn tour
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
