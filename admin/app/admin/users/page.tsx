"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

type UserRow = {
  _id: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
  role: "user" | "admin";
  createdAt: string;
  isActive: boolean; // ✅ thêm trạng thái
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null); // ✅ để disable nút khi đang update

  async function loadUsers() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Không lấy được danh sách người dùng");
      }

      const json = (await res.json()) as UserRow[];
      setUsers(json);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi xảy ra khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // ✅ Toggle active / inactive
  async function handleToggleActive(user: UserRow) {
    try {
      setErrorMsg(null);
      setUpdatingId(user._id);

      const res = await fetch(
        `${BACKEND_URL}/api/admin/users/${user._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !user.isActive }),
        }
      );

      if (!res.ok) {
        throw new Error("Không cập nhật được trạng thái người dùng");
      }

      const updated = (await res.json()) as UserRow;

      // Cập nhật lại state local
      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u))
      );
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Tiêu đề + thanh tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Quản lý tài khoản người dùng</h2>
          <p className="text-sm text-muted-foreground">
            Xem, tìm kiếm và quản lý trạng thái tài khoản trong hệ thống Touraroo.
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
            onClick={loadUsers}
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

      {/* Bảng user */}
      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2">Tên</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Provider</th>
                <th className="text-left py-2">Vai trò</th>
                <th className="text-left py-2">Trạng thái</th>
                <th className="text-left py-2">Ngày tạo</th>
                <th className="text-left py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 text-xs text-muted-foreground"
                  >
                    {loading
                      ? "Đang tải danh sách người dùng..."
                      : "Không tìm thấy người dùng nào."}
                  </td>
                </tr>
              )}

              {filtered.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 text-xs">
                    {u.provider === "google" ? "Google" : "Email/Mật khẩu"}
                  </td>
                  <td className="py-2">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium " +
                        (u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-700")
                      }
                    >
                      {u.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>

                  {/* ✅ Cột trạng thái */}
                  <td className="py-2">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium " +
                        (u.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700")
                      }
                    >
                      {u.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                    </span>
                  </td>

                  <td className="py-2 text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleString("vi-VN")}
                  </td>

                  {/* ✅ Nút hành động */}
                  <td className="py-2">
                    <button
                      onClick={() => handleToggleActive(u)}
                      disabled={updatingId === u._id}
                      className={
                        "px-3 py-1 rounded-md text-xs font-medium border " +
                        (u.isActive
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100") +
                        (updatingId === u._id
                          ? " opacity-60 cursor-not-allowed"
                          : "")
                      }
                    >
                      {updatingId === u._id
                        ? "Đang cập nhật..."
                        : u.isActive
                        ? "Vô hiệu hóa"
                        : "Kích hoạt"}
                    </button>
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
