/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/TouraroLogo.png"
        alt="Touraro Logo"
        width={85}          // tăng chiều ngang
        height={70}          // chiều cao tương ứng
        priority
        //className="h-14 w-auto" // h-14 ~ 56px, w-auto giữ tỉ lệ
      />
    </Link>
  );
}
