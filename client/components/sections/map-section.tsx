"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leafletMap"), {
  ssr: false,
  loading: () => (
    <section
      id="map"
      className="relative w-full h-[500px] flex items-center justify-center"
    >
      <div className="text-sm text-gray-500">Đang tải bản đồ…</div>
    </section>
  ),
});

export default function MapSection() {
  return <LeafletMap />;
}
