import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CartContext } from "./cart";



const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <header className="bg-blue-500 text-white p-4">
        <p>Loading...</p>
      </header>
    );
  }

  const { cartCount } = cartContext;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { path: "/landingPage", label: "HOME" },
    { path: "/", label: "SHOP" },
    { path: "/cart", label: "CART" },
  ];

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-lg font-bold">
        <Link to="/" className="hover:underline">
          ShopSmart
        </Link>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-4">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className="hover:underline relative">
                {label}
                {label === "CART" && cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Authentication Links */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Log Out"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Log In"
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
