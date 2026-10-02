"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { onAuthEvent } from "@/lib/api/auth-events";
import { clearSession, setSession } from "@/lib/api/token-store";
import * as api from "@/lib/api/panel";
import type { TokenResponse, UserProfileDto } from "@/types/api";

interface AuthState {
  user: UserProfileDto | null;
  /** True until the boot-time session restore has finished. */
  loading: boolean;
  /** Store a fresh token pair (login / OTP verify) and adopt its user. */
  startSession: (tokens: TokenResponse) => void;
  /** Re-read /auth/me — e.g. after an admin approved the seller application. */
  reload: () => Promise<UserProfileDto | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

/**
 * Session owner for the panel. The access token lives in memory only; on a reload
 * the first authenticated call (/auth/me) 401s and the API client refreshes with
 * the stored refresh token. The panel's role always comes from /auth/me, never
 * from localStorage or a cookie, and the backend re-checks it on every request.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const u = await api.me();
      setUser(u);
      return u;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    api
      .me()
      .then(setUser, () => setUser(null))
      .finally(() => setLoading(false));
    return onAuthEvent((e) => {
      if (e.type === "session-cleared") setUser(null);
    });
  }, []);

  const startSession = useCallback((tokens: TokenResponse) => {
    setSession(tokens);
    setUser(tokens.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // Server-side revoke failed (offline); the local session is still dropped.
    }
    clearSession("logout", { silent: true });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, startSession, reload, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
