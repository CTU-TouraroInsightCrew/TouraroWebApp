/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

type GuideApplicationRow = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "guide" | "admin";
    isActive: boolean;
  };
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  reason: string;
  avatarUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

// ⭐ helper đọc token 1 chỗ
function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token"); // hoặc "touraro_admin_token" nếu em tách riêng
}

export default function AdminGuideApplicationsPage() {
  const [apps, setApps] = useState<GuideApplicationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  async function loadApps() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const token = getAdminToken();
      console.log("👉 ADMIN TOKEN (loadApps):", token);

      if (!token) {
        setErrorMsg("Chưa có token admin. Vui lòng đăng nhập admin trước.");
        setApps([]);
        return;
      }

      const params =
        filterStatus === "all"
          ? ""
          : `?status=${encodeURIComponent(filterStatus)}`;

      const res = await fetch(
        `${BACKEND_URL}/api/admin/guide-applications${params}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`, // ⭐ luôn gửi Bearer
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("ADMIN API ERROR:", text);
        throw new Error("Không lấy được danh sách hồ sơ hướng dẫn viên");
      }

      const json = await res.json();
      setApps(json);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi xảy ra khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  async function handleApprove(id: string) {
    if (!confirm("Duyệt hồ sơ này trở thành hướng dẫn viên?")) return;

    try {
      const token = getAdminToken();
      console.log("👉 ADMIN TOKEN (approve):", token);

      if (!token) {
        alert("Chưa có token admin. Vui lòng đăng nhập lại.");
        return;
      }

      const res = await fetch(
        `${BACKEND_URL}/api/admin/guide-applications/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // ⭐
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Duyệt hồ sơ thất bại");
        return;
      }

      alert("Đã duyệt hồ sơ");
      loadApps();
    } catch (err) {
      console.error(err);
      alert("Lỗi server khi duyệt hồ sơ");
    }
  }

  async function handleReject(id: string) {
    if (!confirm("Từ chối hồ sơ này?")) return;

    try {
      const token = getAdminToken();
      console.log("👉 ADMIN TOKEN (reject):", token);

      if (!token) {
        alert("Chưa có token admin. Vui lòng đăng nhập lại.");
        return;
      }

      const res = await fetch(
        `${BACKEND_URL}/api/admin/guide-applications/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // ⭐
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Từ chối hồ sơ thất bại");
        return;
      }

      alert("Đã từ chối hồ sơ");
      loadApps();
    } catch (err) {
      console.error(err);
      alert("Lỗi server khi từ chối hồ sơ");
    }
  }

  return (
    <div className="space-y-4">
      {/* Tiêu đề + filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Hồ sơ đăng ký hướng dẫn viên</h2>
          <p className="text-sm text-muted-foreground">
            Duyệt hoặc từ chối các hồ sơ đăng ký làm hướng dẫn viên trong hệ
            thống.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm"
          >
            <option value="pending">Đang chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Đã từ chối</option>
            <option value="all">Tất cả</option>
          </select>
          <button
            onClick={loadApps}
            disabled={loading}
            className="h-9 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent disabled:opacity-60"
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
        </div>
      </div>

      {errorMsg && <div className="text-xs text-red-500">Lỗi: {errorMsg}</div>}

      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2">Tên (hồ sơ)</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">SĐT</th>
                <th className="text-left py-2">Địa chỉ</th>
                <th className="text-left py-2">Trạng thái</th>
                <th className="text-left py-2">Ngày đăng ký</th>
                <th className="text-left py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 text-xs text-muted-foreground"
                  >
                    {loading
                      ? "Đang tải danh sách hồ sơ..."
                      : "Chưa có hồ sơ nào hoặc không khớp bộ lọc."}
                  </td>
                </tr>
              )}

              {apps.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-border/60 last:border-b-0 align-top"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      {app.avatarUrl && (
                        <img
                          src={app.avatarUrl}
                          alt={app.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-xs text-muted-foreground">
                          User: {app.userId?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">{app.email}</td>
                  <td className="py-2">{app.phone}</td>
                  <td className="py-2 text-xs">{app.address}</td>
                  <td className="py-2 text-xs">
                    {app.status === "pending" && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-3 py-0.5">
                        Đang chờ
                      </span>
                    )}
                    {app.status === "approved" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-0.5">
                        Đã duyệt
                      </span>
                    )}
                    {app.status === "rejected" && (
                      <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-0.5">
                        Đã từ chối
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">
                    {new Date(app.createdAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="py-2 text-xs">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleApprove(app._id)}
                        disabled={app.status === "approved"}
                        className="px-3 py-1 rounded bg-emerald-600 text-white text-xs disabled:opacity-50"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(app._id)}
                        disabled={app.status === "rejected"}
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs disabled:opacity-50"
                      >
                        Từ chối
                      </button>
                    </div>
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
