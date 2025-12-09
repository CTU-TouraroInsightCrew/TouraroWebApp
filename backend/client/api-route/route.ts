/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

// backend/client/api-route/route.ts
import axios from "axios";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/route", async (req: Request, res: Response) => {
  try {
    const fromLat = req.query.fromLat as string;
    const fromLon = req.query.fromLon as string;
    const toLat = req.query.toLat as string;
    const toLon = req.query.toLon as string;

    console.log("Route params:", { fromLat, fromLon, toLat, toLon });

    if (!fromLat || !fromLon || !toLat || !toLon) {
      return res.status(400).json({ error: "Thiếu tọa độ" });
    }

    // OSRM demo (driving)
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=full&geometries=geojson`;

    const osrmRes = await axios.get(url);
    const route = osrmRes.data.routes?.[0];

    if (!route) {
      console.error("No route in OSRM response:", osrmRes.data);
      return res.status(500).json({ error: "Không tìm được đường đi" });
    }

    // [lon, lat] → [lat, lon] cho Leaflet
    const coords: [number, number][] = route.geometry.coordinates.map(
      (c: [number, number]) => [c[1], c[0]]
    );

    const result = {
      path: coords,
      distance: route.distance, // mét
      duration: route.duration, // giây
    };

    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Lỗi route API:", err?.message || err);
    return res.status(500).json({ error: "Lỗi server route" });
  }
});

export default router;
