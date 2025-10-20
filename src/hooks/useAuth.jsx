import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sesión al montar
  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.getCurrentUser();
        setUser(res.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async ({ username, password }) => {
    setError(null);
    const res = await apiClient.login({ username, password });
    setUser(res.user || null);
    return res;
  };

  const register = async ({ username, email, password }) => {
    setError(null);
    const res = await apiClient.register({ username, email, password });
    setUser(res.user || null);
    return res;
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } finally {
      setUser(null);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getCurrentUser();
      setUser(res.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe ser usado dentro de AuthProvider');
  return ctx;
}

