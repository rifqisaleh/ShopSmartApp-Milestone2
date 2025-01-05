import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adjust path as needed

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/"); // Redirect to the home page
  };

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
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/#ourservices" className="hover:underline">
              Our Services
            </Link>
          </li>
          <li>
            <Link to="/#paragraph2" className="hover:underline">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Authentication Links */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Log Out
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
