import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Utility function to check if the token is valid and not expired
const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 > Date.now(); // Compare expiry with the current time
  } catch (e) {
    console.error("Invalid token:", e);
    return false; // Return false if the token is invalid
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for a valid token in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    if (token && isTokenValid(token)) {
      console.log("isAuthenticated: true (Token is valid)");
      setIsAuthenticated(true);
    
    } else {
      console.log("isAuthenticated: false (Token is invalid or expired)");
      localStorage.removeItem("token"); // Remove invalid/expired token
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token: string) => {
    console.log("Logging in...");
    console.log("Token before saving:", token); // Log the token being saved
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    console.log("isAuthenticated after login:", isAuthenticated); // Log updated state

  };

  const logout = () => {
    console.log("Logging out...");
  console.log("Token before clearing:", localStorage.getItem("token")); // Log the token being cleared
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  console.log("isAuthenticated after logout:", isAuthenticated); // Log updated state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
