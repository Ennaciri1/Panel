// src/pages/Login/Login.jsx - VERSION SIMPLIFIÉE TEMPORAIRE
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

export default function Login() {
  // Tous les hooks d'abord
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Returns conditionnels après tous les hooks
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-shell">
      <aside className="brand-side">
        <div className="brand-inner">
          <img className="logo" src="/assets/logos/aji-mark.svg" alt="AJIAPP logo"/>
          <p className="tagline">AJIAPP</p>
          <p className="sub">Designed so your business can thrive</p>
        </div>
        <footer className="copy">2025 by AJIAPP</footer>
      </aside>

      <main className="form-side">
        <div className="form-wrap">
          <h1 className="title">Welcome</h1>
          <h3 className="subtitle">Sign in to your account</h3>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              border: '1px solid #fecaca', 
              padding: '12px', 
              borderRadius: '6px', 
              color: '#dc2626',
              marginBottom: '16px' 
            }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />

            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Demo: any email + any password works
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}