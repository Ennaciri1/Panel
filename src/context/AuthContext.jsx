// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useCallback } from "react";

// État initial
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Contexte
const AuthContext = createContext(null);

// Fournisseur du contexte
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fonction de connexion
  const login = useCallback(async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    try {
      // Simulation d'une API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Vérification basique (à remplacer par une vraie API)
      if (email && password) {
        const user = {
          id: 1,
          email,
          name: email.split('@')[0] || "User",
          role: "admin",
        };

        // Stocker le token (simulation)
        localStorage.setItem("auth_token", "mock_token_123");
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        return { success: true };
      } else {
        throw new Error("Email et mot de passe requis");
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  // Fonction de déconnexion
  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  // Vérifier l'authentification
  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem("auth_token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        const user = JSON.parse(userStr);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "Erreur de vérification" });
      // En cas d'erreur, on déconnecte l'utilisateur
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Effacer les erreurs
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext doit être utilisé dans un AuthProvider");
  }
  return context;
}