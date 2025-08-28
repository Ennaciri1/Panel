// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

// Icônes (tu peux les remplacer par tes SVG ou des icônes MUI)
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const ListingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
  </svg>
);

const ReviewsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
  </svg>
);

const BookingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const menuItems = [
  {
    name: "Home",
    href: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    name: "Listings",
    href: "/dashboard/listings",
    icon: ListingsIcon,
  },
  {
    name: "Customer Reviews",
    href: "/dashboard/reviews",
    icon: ReviewsIcon,
  },
  {
    name: "Bookings",
    href: "/dashboard/bookings",
    icon: BookingsIcon,
  },
];

const secondaryItems = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: AnalyticsIcon,
  },
];

export default function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <img
            src="/assets/logos/aji-mark.svg"
            alt="AJI"
            className="h-12 w-auto"
          />
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-brand-primary'
                }`
              }
            >
              <item.icon />
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Séparateur */}
        <div className="px-4">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Navigation secondaire */}
        <nav className="px-4 py-4 space-y-1">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-brand-primary'
                }`
              }
            >
              <item.icon />
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2025 AJI
          </p>
        </div>
      </div>
    </div>
  );
}