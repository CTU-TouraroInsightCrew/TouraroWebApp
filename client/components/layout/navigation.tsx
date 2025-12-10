/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-8 items-center">
        <li>
          <Link href="/#hero" className="cursor-pointer hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/#locations"
            className="cursor-pointer hover:text-primary"
          >
            Locations
          </Link>
        </li>
        <li>
          <Link
            href="/#guides-section"
            className="cursor-pointer hover:text-primary"
          >
            Guide
          </Link>
        </li>
        <li>
          <Link href="/#map" className="cursor-pointer hover:text-primary">
            Map
          </Link>
        </li>
        <li>
          <Link
            href="/#chat-container"
            className="cursor-pointer hover:text-primary"
          >
            Chat
          </Link>
        </li>
        {/* ❌ Không để Login / Sign Up ở đây nữa.
            2 nút đó đã được xử lý trong Header dựa trên useAuth() */}
      </ul>
    </nav>
  );
}
