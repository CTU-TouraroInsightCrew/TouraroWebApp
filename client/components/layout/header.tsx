/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

"use client";

import React, { useState } from "react";
import Logo from "../logo";
import MobileMenuToggle from "./mobile-menu-toggle";
import MobileNav from "./mobile-nav";
import Navigation from "./navigation";
import Wrapper from "../wrapper";
import { AnimatePresence } from "motion/react";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0059B3] shadow-md text-white">
      <Wrapper>
        <div className="flex items-center justify-between h-16 px-4 gap-4">
          {/* Logo bên trái */}
          <Logo />

          {/* Nav + user phần giữa/phải */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* Nav desktop */}
            <div className="hidden md:block">
              <Navigation />
            </div>

            {/* Khu vực user */}
            <div className="flex items-center gap-3">
              {loading ? (
                <span className="text-xs text-blue-100">Loading...</span>
              ) : user ? (
                <div className="flex items-center gap-3">
                  {/* Nếu là admin: nút đi tới admin */}
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/60 text-white bg-transparent hover:bg-white/10"
                      >
                        Admin
                      </Button>
                    </Link>
                  )}

                  {/* Avatar + dropdown đơn giản */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 rounded-full border border-white/40 px-3 py-1 hover:bg-white/10">
                      <div className="w-8 h-8 rounded-full bg-white text-[#0059B3] flex items-center justify-center text-sm font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">
                        {user.name}
                      </span>
                    </button>

                    <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-md rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        Hồ sơ cá nhân
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      size="sm"
                      className="bg-white text-[#0059B3] hover:bg-gray-100"
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}

              {/* Nút menu mobile */}
              <div className="md:hidden">
                <MobileMenuToggle onToggle={handleToggle} />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Nav mobile */}
      <AnimatePresence>
        {isOpen && <MobileNav onClose={handleClose} />}
      </AnimatePresence>
    </header>
  );
}
