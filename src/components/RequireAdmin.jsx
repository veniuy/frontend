// src/components/RequireAdmin.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-500 mx-auto" />
          <p className="mt-3 text-gray-600">Cargando…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isAdmin =
    user?.is_admin === true ||
    user?.isAdmin === true ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
