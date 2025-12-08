"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

type SiteContent = {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  highlightTitle: string;
  highlightDescription: string;
  updatedAt: string;
};

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Local states cho form
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightDescription, setHighlightDescription] = useState("");

  async function loadContent() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch(`${BACKEND_URL}/api/admin/content`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Không lấy được nội dung client");
      }

      const json = (await res.json()) as SiteContent;
      setContent(json);
      setHeroTitle(json.heroTitle);
      setHeroSubtitle(json.heroSubtitle);
      setHighlightTitle(json.highlightTitle);
      setHighlightDescription(json.highlightDescription);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi khi lấy nội dung");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const res = await fetch(`${BACKEND_URL}/api/admin/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heroTitle,
          heroSubtitle,
          highlightTitle,
          highlightDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Không lưu được nội dung");
      }

      const json = (await res.json()) as SiteContent;
      setContent(json);
      setSuccessMsg("Đã lưu nội dung thành công.");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Có lỗi khi lưu nội dung");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold">Quản lý content ở client</h2>
        <p className="text-sm text-muted-foreground">
          Điều chỉnh banner, section nổi bật và nội dung hiển thị ở phía client
          (trang chủ).
        </p>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-500">Lỗi: {errorMsg}</div>
      )}
      {successMsg && (
        <div className="text-xs text-emerald-600">{successMsg}</div>
      )}

      {/* Banner / Hero section */}
      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Banner / Hero ở trang client</p>
          <button
            onClick={loadContent}
            disabled={loading}
            className="h-8 px-3 rounded-lg border border-border bg-background text-xs hover:bg-accent disabled:opacity-60"
          >
            {loading ? "Đang tải..." : "Tải lại"}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Tiêu đề chính (heroTitle)
          </label>
          <input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm"
            placeholder="Ví dụ: Khám phá Cần Thơ cùng Touraroo"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Mô tả ngắn (heroSubtitle)
          </label>
          <textarea
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full min-h-[70px] px-3 py-2 rounded-lg border border-border bg-background text-sm"
            placeholder="Ví dụ: Trải nghiệm tour du lịch thông minh, kết hợp dữ liệu thời gian thực..."
          />
        </div>
      </div>

      {/* Highlight section */}
      <div className="rounded-2xl bg-card border border-border px-5 py-4 shadow-sm space-y-3">
        <p className="text-sm font-medium">Section tour nổi bật / highlight</p>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Tiêu đề section (highlightTitle)
          </label>
          <input
            value={highlightTitle}
            onChange={(e) => setHighlightTitle(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm"
            placeholder="Ví dụ: Tour nổi bật"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Mô tả section (highlightDescription)
          </label>
          <textarea
            value={highlightDescription}
            onChange={(e) => setHighlightDescription(e.target.value)}
            className="w-full min-h-[70px] px-3 py-2 rounded-lg border border-border bg-background text-sm"
            placeholder="Ví dụ: Danh sách các tour được yêu thích và đề xuất cho du khách..."
          />
        </div>
      </div>

      {/* Save button + meta */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-9 px-4 rounded-lg border border-border bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>

        {content && (
          <p className="text-[11px] text-muted-foreground">
            Cập nhật lần cuối:{" "}
            {new Date(content.updatedAt).toLocaleString("vi-VN")}
          </p>
        )}
      </div>
    </div>
  );
}
