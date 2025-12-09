/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

// client/lib/auth.ts
export const BACKEND_URL = "http://localhost:4000";

const TOKEN_KEY = "token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
