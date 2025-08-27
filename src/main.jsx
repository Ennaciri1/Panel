// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Styles globaux
import "./styles/globals.css";

// Pages
import App from "./App";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Dashboard/Home/Home";
import Listings from "./pages/Dashboard/Listings/Listings";
import Reviews from "./pages/Dashboard/Reviews/Reviews";
import Bookings from "./pages/Dashboard/Bookings/Bookings";
import Settings from "./pages/Dashboard/Settings/Settings";
import Analytics from "./pages/Dashboard/Analytics/Analytics";
import NotFound from "./pages/NotFound/NotFound";

// Configuration des routes avec errorElement
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "home",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "listings",
        element: <Listings />,
        errorElement: <NotFound />,
      },
      {
        path: "reviews",
        element: <Reviews />,
        errorElement: <NotFound />,
      },
      {
        path: "bookings",
        element: <Bookings />,
        errorElement: <NotFound />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <NotFound />,
      },
      {
        path: "analytics",
        element: <Analytics />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);