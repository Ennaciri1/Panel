// src/components/layout/DashboardLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import LoadingSpinner from "../common/LoadingSpinner";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  // Toujours appeler les hooks d'abord
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64"> {/* Espace pour la sidebar fixe */}
        <TopBar />
        <main className="pt-16 p-6"> {/* Espace pour la topbar fixe */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}