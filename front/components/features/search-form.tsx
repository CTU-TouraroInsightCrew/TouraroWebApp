"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

export default function SearchForm() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    // Xử lý tìm kiếm, ví dụ gọi API hoặc chuyển trang
    console.log("Searching for:", query);
    // Reset input nếu muốn
    // setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Search
      </Button>
    </form>
  );
}
