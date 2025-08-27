// src/components/layout/TopBar.jsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NotificationIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

const InboxIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Titre de la page (optionnel) */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Dashboard
            </h1>
          </div>

          {/* Actions de la barre supérieure */}
          <div className="flex items-center space-x-4">
            {/* Boîte de réception */}
            <button className="p-2 text-gray-500 hover:text-brand-primary rounded-lg hover:bg-gray-100 transition-colors">
              <InboxIcon />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-brand-primary rounded-lg hover:bg-gray-100 transition-colors">
                <NotificationIcon />
                {/* Badge de notification */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name || "User"}
                </span>
                <ChevronDownIcon />
              </button>

              {/* Menu déroulant */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/dashboard/settings");
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
}