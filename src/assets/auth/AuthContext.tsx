import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean; // New loading state
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      console.log("isAuthenticated: true (Token is valid)");
      setIsAuthenticated(true);
    } else {
      console.log("isAuthenticated: false (Token is invalid or expired)");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Validation complete
  }, []);

  const login = (token: string) => {
    console.log("Storing token in localStorage and setting isAuthenticated to true.");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
