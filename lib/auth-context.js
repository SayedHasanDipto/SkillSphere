"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// BetterAuth client-side auth context wrapper
// This wraps better-auth's useSession hook for convenience
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, try to load session from better-auth
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/auth/get-session");
      if (res.ok) {
        const data = await res.json();
        setUser(data?.user || null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, refetch: checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
