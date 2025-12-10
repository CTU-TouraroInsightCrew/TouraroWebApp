/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL, getToken, clearToken } from "@/lib/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatarUrl?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        clearToken();
        setUser(null);
      } else {
        const data = await res.json();
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          avatarUrl: data.avatarUrl,
        });
      }
    } catch (e) {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser: fetchMe,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
