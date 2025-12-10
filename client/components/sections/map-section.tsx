/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leafletMap"), {
  ssr: false,
  loading: () => (
    <section
      id="map-loading"
      className="relative w-full h-[500px] flex items-center justify-center"
    >
      <div className="text-sm text-gray-500">Đang tải bản đồ…</div>
    </section>
  ),
});

export default function MapSection() {
  return (
    <section id="map-section" className="relative w-full h-[500px]">
      <LeafletMap />
    </section>
  );
}