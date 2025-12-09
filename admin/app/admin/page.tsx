/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

// ===== Types =====
type WeatherData = {
  city: string;
  temp: number;
  humidity: number;
  description: string;
  icon?: string;
};

type TrafficRow = {
  roadName: string;
  congestion: "Ùn tắc" | "Trung bình" | "Thông thoáng";
  speed: string; // ví dụ "18 km/h"
  suggestion: string;
};

type AdminStats = {
  totalUsers: number;
  activeGuides: number;
};

export default function AdminDashboardPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [traffic, setTraffic] = useState<TrafficRow[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // =============================
  // Helpers
  // =============================
  function formatNow() {
    const now = new Date();
    return (
      now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) +
      " " +
      now.toLocaleDateString("vi-VN")
    );
  }

  // Lấy dữ liệu thời tiết từ /api/weather cho Cần Thơ
  async function loadWeather() {
    const res = await fetch(
      `${BACKEND_URL}/api/weather?city=Can Tho`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Không lấy được dữ liệu thời tiết");
    }

    const json = (await res.json()) as WeatherData;
    setWeather(json);
  }

  // Lấy dữ liệu giao thông từ /api/route cho vài tuyến cố định ở Cần Thơ
  async function loadTraffic() {
    const routesConfig = [
      {
        roadName: "Đường 30 Tháng 4",
        fromLat: 10.0165,
        fromLon: 105.7575,
        toLat: 10.0205,
        toLon: 105.782,
        suggestion: "Hạn chế xếp tour đi tuyến này giờ cao điểm.",
      },
      {
        roadName: "Đường 3/2",
        fromLat: 10.025,
        fromLon: 105.759,
        toLat: 10.032,
        toLon: 105.78,
        suggestion: "Xem xét điều chỉnh khung giờ xuất phát.",
      },
      {
        roadName: "Nguyễn Văn Cừ nối dài",
        fromLat: 10.018,
        fromLon: 105.761,
        toLat: 10.04,
        toLon: 105.77,
        suggestion: "Ưu tiên dùng tuyến này cho tour di chuyển nhiều.",
      },
    ];

    const rows: TrafficRow[] = [];

    for (const r of routesConfig) {
      const params = new URLSearchParams({
        fromLat: String(r.fromLat),
        fromLon: String(r.fromLon),
        toLat: String(r.toLat),
        toLon: String(r.toLon),
      });

      const res = await fetch(
        `${BACKEND_URL}/api/route?${params.toString()}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("Không lấy được dữ liệu route");
      }

      const json = (await res.json()) as {
        distance: number; // mét
        duration: number; // giây
      };

      const km = json.distance / 1000;
      const hours = json.duration / 3600;
      const speedValue = hours > 0 ? km / hours : 0; // km/h

      let congestion: TrafficRow["congestion"];
      if (speedValue < 20) {
        congestion = "Ùn tắc";
      } else if (speedValue < 35) {
        congestion = "Trung bình";
      } else {
        congestion = "Thông thoáng";
      }

      rows.push({
        roadName: r.roadName,
        congestion,
        speed: `${speedValue.toFixed(0)} km/h`,
        suggestion: r.suggestion,
      });
    }

    setTraffic(rows);
  }

  // Lấy thống kê user từ MongoDB
  async function loadStats() {
    const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Không lấy được thống kê admin");
    }

    const json = (await res.json()) as AdminStats;
    setStats(json);
  }

  // Hàm load tất cả data
  async function refreshAll() {
    try {
      setLoading(true);
      setErrorMsg(null);

      await Promise.all([loadWeather(), loadTraffic(), loadStats()]);

      setLastUpdated(formatNow());
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi xảy ra khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =============================
  // UI
  // =============================
  return (
    <div className="space-y-6">
      {/* Title + refresh */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            Tổng quan đô thị Cần Thơ theo thời gian thực
          </h2>
          <p className="text-sm text-muted-foreground">
            Dữ liệu thời tiết, giao thông, mực nước khu vực Cần Thơ – phục vụ ra
            quyết định cho thành phố thông minh.
          </p>
        </div>

        <button
          onClick={refreshAll}
          disabled={loading}
          className="h-9 px-4 rounded-full border border-border bg-card text-sm font-medium hover:bg-accent disabled:opacity-60"
        >
          {loading ? "Đang tải..." : "Làm mới dữ liệu"}
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-500">Lỗi: {errorMsg}</div>
      )}

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Tổng số người dùng */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">
            Tổng số người dùng
          </p>
          <p className="text-3xl font-semibold">
            {stats ? stats.totalUsers : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Số tài khoản đã đăng ký
          </p>
        </div>

        {/* Hướng dẫn viên đang hoạt động */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">
            Hướng dẫn viên đang hoạt động
          </p>
          <p className="text-3xl font-semibold">
            {stats ? stats.activeGuides : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Đã được duyệt và còn hiệu lực
          </p>
        </div>

        {/* Cập nhật gần nhất */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">
            Cập nhật gần nhất
          </p>
          <p className="text-lg font-semibold">
            {lastUpdated || "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Thời điểm đồng bộ dữ liệu
          </p>
        </div>
      </div>

      {/* Middle row: weather + water level */}
      <div className="grid gap-4 lg:grid-cols-[2fr,2fr]">
        {/* Weather */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Thời tiết hiện tại</p>
              <p className="text-xs text-muted-foreground">
                Dữ liệu từ OpenWeather / NGSI-LD WeatherObserved (Cần Thơ)
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-1">
            <div className="flex-1">
              <p className="text-4xl font-semibold leading-tight">
                {weather ? `${weather.temp}ºC` : "-- ºC"}
              </p>
              <p className="text-sm font-medium mt-1">
                {weather
                  ? `Cần Thơ • Độ ẩm ${weather.humidity}%`
                  : "Đang tải..."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {weather ? weather.description : ""}
              </p>
            </div>

            <div className="flex-1 rounded-xl bg-sky-50 px-4 py-3 text-xs text-slate-700">
              <p className="font-semibold mb-1">Gợi ý cho quản trị</p>
              <p>
                Theo dõi thời tiết khu vực Bến Ninh Kiều, trung tâm Cần Thơ để
                điều phối tour du thuyền, đi bộ và hoạt động ngoài trời phù hợp.
              </p>
            </div>
          </div>
        </div>

        {/* Water level – demo static */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mực nước & triều cường</p>
              <p className="text-xs text-muted-foreground">
                (Demo) Khu vực sông Hậu – Cần Thơ
              </p>
            </div>

            <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium">
              Cao – Cần chú ý
            </span>
          </div>

          <div className="mt-1">
            <p className="text-xs text-muted-foreground">
              Bến Ninh Kiều – Sông Hậu
            </p>
            <p className="mt-2 text-4xl font-semibold leading-tight">
              1.46 m
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Dựa trên ngưỡng thiết lập, hệ thống có thể phát cảnh báo khi mực
              nước và triều cường tại Cần Thơ vượt mức an toàn, hỗ trợ điều
              chỉnh lịch tour và thông báo sớm cho du khách.
            </p>
          </div>
        </div>
      </div>

      {/* Traffic table */}
      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
        <div className="mb-3">
          <p className="text.sm font-medium">
            Tình trạng giao thông theo tuyến (Cần Thơ)
          </p>
          <p className="text-xs text-muted-foreground">
            Dữ liệu tính từ OSRM (/api/route) cho một số tuyến đường chính ở
            Cần Thơ – có thể mở rộng lấy GTFS realtime, API giao thông hoặc
            NGSI-LD TrafficFlowObserved.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2">Tuyến đường</th>
                <th className="text-left py-2">Mức độ ùn tắc</th>
                <th className="text-left py-2">Tốc độ trung bình</th>
                <th className="text-left py-2">Gợi ý</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {traffic.length === 0 && (
                <tr>
                  <td
                    className="py-3 text-xs text-muted-foreground"
                    colSpan={4}
                  >
                    {loading
                      ? "Đang tải dữ liệu giao thông..."
                      : "Chưa có dữ liệu giao thông."}
                  </td>
                </tr>
              )}

              {traffic.map((row) => (
                <tr
                  key={row.roadName}
                  className="border-b border-border/80 last:border-b-0"
                >
                  <td className="py-2">{row.roadName}</td>
                  <td className="py-2">
                    {row.congestion === "Ùn tắc" && (
                      <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-0.5 text-xs font-medium">
                        Ùn tắc
                      </span>
                    )}
                    {row.congestion === "Trung bình" && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-3 py-0.5 text-xs font-medium">
                        Trung bình
                      </span>
                    )}
                    {row.congestion === "Thông thoáng" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-0.5 text-xs font-medium">
                        Thông thoáng
                      </span>
                    )}
                  </td>
                  <td className="py-2">{row.speed}</td>
                  <td className="py-2 text-xs text-muted-foreground">
                    {row.suggestion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
