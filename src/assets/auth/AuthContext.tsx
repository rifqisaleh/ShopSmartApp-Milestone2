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
    if (!payload.sub) {
      console.error("Token missing 'sub' claim:", payload);
      return false;
    }
    const isValid = payload.exp * 1000 > Date.now();
    console.log("Token Validation Result:", { payload, isValid });
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
      console.log("Token is valid, setting isAuthenticated to true.");
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
    const token = localStorage.getItem("token"); // Use const for immutable variables
    if (!token) {
      throw new Error("No token available.");
    }
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    const fullUrl = `${import.meta.env.VITE_API_URL}${url}`;
    console.log("Making request to:", fullUrl);
  
    const response = await fetch(fullUrl, { ...options, headers });
  
    if (response.status === 401) {
      console.log("Access token expired. Attempting to refresh token...");
  
      // Get the refresh token
      const refreshToken = localStorage.getItem("refreshToken"); // Use const here too
      if (!refreshToken) {
        throw new Error("No refresh token available.");
      }
  
      // Refresh the token
      const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh token.");
      }
  
      const refreshData = await refreshResponse.json();
      console.log("Token refreshed successfully:", refreshData);
  
      // Store the new tokens
      localStorage.setItem("token", refreshData.access_token);
      localStorage.setItem("refreshToken", refreshData.refresh_token);
  
      // Retry the original request with the new token
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${refreshData.access_token}`,
      };
      return fetch(fullUrl, { ...options, headers: retryHeaders });
    }
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(errorData.message || "Request failed");
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
