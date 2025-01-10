import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isValid = payload.exp * 1000 > Date.now();
    console.log("Token Validation:", { payload, isValid });
    return isValid;
  } catch (e) {
    console.error("Token Validation Error:", e);
    return false;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      console.log("Token is valid, setting isAuthenticated to true:", token);
      setIsAuthenticated(true);
    } else {
      console.log("Token is invalid or expired, clearing token.");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    console.log("Storing token and setting isAuthenticated to true:", token);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Clearing token and setting isAuthenticated to false.");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token available. Please log in.");
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    console.log("Making authenticated request:", { url, headers });
    const response = await fetch(url, { ...options, headers });
  
    if (!response.ok) {
      const errorResponse = await response.json(); // Log detailed error
      console.error("API Error Response:", errorResponse);
      throw new Error(errorResponse.message || "Failed to fetch");
    }
  
    return response;
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
