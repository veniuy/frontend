import { useState, useEffect, createContext, useContext } from 'react';
import { apiClient } from '../lib/api';

const AuthContext = createContext();

// Verificar si estamos en modo desarrollo
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!DEV_MODE); // No loading en dev mode
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!DEV_MODE) {
      checkAuthStatus();
    } else {
      // En modo desarrollo, simular usuario autenticado
      setUser({
        id: 'dev-user',
        email: 'dev@example.com',
        name: 'Usuario de Desarrollo',
        role: 'admin'
      });
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    if (DEV_MODE) return;
    
    try {
      setLoading(true);
      const response = await apiClient.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      // Usuario no autenticado
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    if (DEV_MODE) {
      // En modo desarrollo, simular login exitoso
      const mockUser = {
        id: 'dev-user',
        email: credentials.email || 'dev@example.com',
        name: 'Usuario de Desarrollo',
        role: 'admin'
      };
      setUser(mockUser);
      return { user: mockUser };
    }

    try {
      setError(null);
      const response = await apiClient.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    if (DEV_MODE) {
      // En modo desarrollo, simular registro exitoso
      const mockUser = {
        id: 'dev-user',
        email: userData.email || 'dev@example.com',
        name: userData.name || 'Usuario de Desarrollo',
        role: 'user'
      };
      setUser(mockUser);
      return { user: mockUser };
    }

    try {
      setError(null);
      const response = await apiClient.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (DEV_MODE) {
      setUser(null);
      return;
    }

    try {
      await apiClient.logout();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar usuario local incluso si hay error en el servidor
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isDevMode: DEV_MODE,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}

