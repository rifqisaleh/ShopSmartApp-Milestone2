import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CartContext } from "./cart";

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null; // Ensure the header renders only when CartContext is available
  }

  const { cartCount } = cartContext;

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
          <li>
            <Link to="/landingPage" className="hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              SHOP
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline relative">
              CART
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Authentication Links */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
