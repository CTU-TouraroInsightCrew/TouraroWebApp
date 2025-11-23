"use client";

import React from "react";

const guides = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
    avatar: "/images/guide1.jpg",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
    avatar: "/images/guide2.jpg",
  },
  {
    id: 2,
    name: "Le Van C",
    email: "c@example.com",
    phone: "0987654321",
    avatar: "/images/guide3.jpg",
  },
];

export default function GuideSection() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
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
                src={guide.avatar}
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
