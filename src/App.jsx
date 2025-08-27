// src/App.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/common/LoadingSpinner";

export default function App() {
  const { user, loading, checkAuth } = useAuth();

  // Toujours appeler les hooks en premier, avant tout return conditionnel
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Maintenant on peut faire les returns conditionnels
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Rediriger vers le dashboard si connecté, sinon vers login
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}