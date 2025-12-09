/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

import { NextResponse } from "next/server";

type LatLngTuple = [number, number];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const fromLat = Number(searchParams.get("fromLat"));
  const fromLon = Number(searchParams.get("fromLon"));
  const toLat = Number(searchParams.get("toLat"));
  const toLon = Number(searchParams.get("toLon"));

  if ([fromLat, fromLon, toLat, toLon].some((x) => Number.isNaN(x))) {
    return NextResponse.json(
      { error: "Invalid coordinates" },
      { status: 400 }
    );
  }

  // Gọi OSRM demo server: đi bộ (foot) hoặc driving
  const osrmUrl = `https://router.project-osrm.org/route/v1/foot/${fromLon},${fromLat};${toLon},${toLat}?overview=full&geometries=geojson`;

  const res = await fetch(osrmUrl);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("OSRM error:", res.status, text);
    return NextResponse.json(
      { error: "OSRM routing failed" },
      { status: 500 }
    );
  }

  const data = await res.json();

  if (!data.routes || data.routes.length === 0) {
    return NextResponse.json(
      { error: "No route found" },
      { status: 404 }
    );
  }

  const route = data.routes[0];

  // coords OSRM: [lon, lat]
  const coords: [number, number][] = route.geometry.coordinates;

  let path: LatLngTuple[] = coords.map(([lon, lat]) => [lat, lon]);

  // ✅ Ép route bắt đầu đúng vị trí from
  path = [[fromLat, fromLon], ...path];

  // ✅ Ép route kết thúc đúng vị trí to
  path = [...path, [toLat, toLon]];

  const distance = route.distance; // m (chỉ tính đoạn OSRM trên đường)
  const duration = route.duration; // s

  return NextResponse.json({
    path,
    distance,
    duration,
  });
}
