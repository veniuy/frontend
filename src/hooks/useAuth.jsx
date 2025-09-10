import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { apiClient } from '../lib/api';

// Creamos el contexto
const AuthContext = createContext(null);

// Provider con estado y métodos de auth
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // objeto usuario o null
  const [loading, setLoading] = useState(true); // true mientras verificamos sesión
  const [error, setError] = useState(null);     // último error de auth

  // Verifica sesión al montar (usa /api/auth/me)
  useEffect(() => {
    let abort = false;
    async function checkAuthStatus() {
      try {
        setLoading(true);
        const res = await apiClient.getCurrentUser(); // GET /api/auth/me
        if (!abort) setUser(res?.user || null);
      } catch {
        if (!abort) setUser(null);
      } finally {
        if (!abort) setLoading(false);
      }
    }
    checkAuthStatus();
    return () => { abort = true; };
  }, []);

  // Login (POST /api/auth/login)
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const res = await apiClient.login(credentials);
      setUser(res?.user || null);
      return res;
    } catch (e) {
      const msg = e?.message || 'Error al iniciar sesión';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Register (POST /api/auth/register)
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const res = await apiClient.register(userData);
      setUser(res?.user || null);
      return res;
    } catch (e) {
      const msg = e?.message || 'Error al registrar';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Logout (POST /api/auth/logout)
  const logout = async () => {
    try {
      setLoading(true);
      await apiClient.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir el contexto
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe ser usado dentro de AuthProvider');
  return ctx;
}
