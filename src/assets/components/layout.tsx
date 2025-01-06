import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useAuth } from "../auth/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header>
        <div className="flex items-center justify-end">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="text-blue-500 hover:underline px-4 py-2"
            >
              Login
            </a>
          )}
        </div>
      </Header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
