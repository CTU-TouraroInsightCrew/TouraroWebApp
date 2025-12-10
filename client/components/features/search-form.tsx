/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // ❗ Sau này bạn có thể đổi sang gọi API, còn hiện tại cho nó điều hướng
    router.push(`/search?query=${encodeURIComponent(trimmed)}&city=Can%20Tho`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 md:flex-row md:items-center"
    >
      {/* Ô nhập nội dung tìm kiếm */}
      <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2 md:px-4 md:py-3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm tour, địa điểm, sự kiện ở Cần Thơ..."
          className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 text-sm md:text-base"
        />
      </div>

      {/* Nút submit */}
      <button
        type="submit"
        className="w-full md:w-auto rounded-xl px-4 py-2 md:px-5 md:py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
