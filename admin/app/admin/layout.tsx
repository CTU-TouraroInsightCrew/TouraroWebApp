"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Người dùng" },
  { href: "/admin/guides", label: "Hướng dẫn viên" },
  { href: "/admin/content", label: "Nội dung client" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="px-4 py-4 border-b border-sidebar-border">
          <Link href="/" className="block">
            <span className="text-lg font-bold tracking-tight">
              Touraro Admin
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Control Dashboard
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  className={cn(
                    "w-full justify-start rounded-lg text-sm",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-sidebar-border text-xs text-muted-foreground">
          © {new Date().getFullYear()} Touraroo
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-background">
        <header className="h-14 border-b border-border bg-card/70 backdrop-blur flex items-center justify-between px-6">
          <h1 className="text-sm font-semibold">Bảng điều khiển</h1>
          <span className="text-xs text-muted-foreground">
            Admin • Real-time city data
          </span>
        </header>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
