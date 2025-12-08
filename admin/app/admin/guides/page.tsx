"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

type GuideRow = {
  _id: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
  role: "user" | "guide" | "admin";
  createdAt: string;
};

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<GuideRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function loadGuides() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch(`${BACKEND_URL}/api/admin/guides`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Không lấy được danh sách hướng dẫn viên");
      }

      const json = (await res.json()) as GuideRow[];
      setGuides(json);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi xảy ra khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGuides();
  }, []);

  const filtered = guides.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Tiêu đề + thanh tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Quản lý hướng dẫn viên</h2>
          <p className="text-sm text-muted-foreground">
            Quản lý hồ sơ và trạng thái hoạt động của các tình nguyện viên
            hướng dẫn tour trong hệ thống Touraroo.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm"
          />
          <button
            onClick={loadGuides}
            disabled={loading}
            className="h-9 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent disabled:opacity-60"
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-500">Lỗi: {errorMsg}</div>
      )}

      {/* Bảng hướng dẫn viên */}
      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2">Tên</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Nguồn đăng ký</th>
                <th className="text-left py-2">Vai trò</th>
                <th className="text-left py-2">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-3 text-xs text-muted-foreground"
                  >
                    {loading
                      ? "Đang tải danh sách hướng dẫn viên..."
                      : "Chưa có hướng dẫn viên nào hoặc không khớp bộ lọc."}
                  </td>
                </tr>
              )}

              {filtered.map((g) => (
                <tr
                  key={g._id}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="py-2">{g.name}</td>
                  <td className="py-2">{g.email}</td>
                  <td className="py-2 text-xs">
                    {g.provider === "google" ? "Google" : "Email/Mật khẩu"}
                  </td>
                  <td className="py-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-0.5 text-xs font-medium">
                      Tình nguyện viên
                    </span>
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">
                    {new Date(g.createdAt).toLocaleString("vi-VN")}
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
