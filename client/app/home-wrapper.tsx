/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HomeWrapper({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();

  useEffect(() => {
    const lat = params.get("destLat");
    const lng = params.get("destLng");

    if (lat && lng) {
      // Scroll tới Map Section
      const section = document.getElementById("map");

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300); // đợi map load 1 chút
      }
    }
  }, [params]);

  return <>{children}</>;
}