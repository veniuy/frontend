import { useState, useEffect, useCallback, useMemo } from "react";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
  "https://backend-xtqe.onrender.com";

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const isJson =
    res.headers.get("content-type")?.includes("application/json") ?? false;
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const me = useCallback(async () => {
    try {
      const data = await api("/api/auth/me", { method: "GET" });
      if (data?.user) setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    me();
  }, [me]);

  const login = useCallback(async ({ email, username, password }) => {
    const usernameOrEmail = username || email; // admite cualquiera
    if (!usernameOrEmail || !password) {
      throw new Error("Usuario/Email y contraseña son requeridos");
    }
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: usernameOrEmail, password }),
    });
    await me();
  }, [me]);

  const register = useCallback(async ({ username, email, password }) => {
    if (!username || !email || !password) {
      throw new Error("Usuario, email y contraseña son requeridos");
    }
    await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
    await me();
  }, [me]);

  // si ya tienes OAuth en el backend en /api/oauth/google/login
  const loginWithGoogle = useCallback(() => {
    window.location.href = `${API_BASE}/api/oauth/google/login`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  return useMemo(
    () => ({ user, ready, login, register, logout, loginWithGoogle }),
    [user, ready, login, register, logout, loginWithGoogle]
  );
}
