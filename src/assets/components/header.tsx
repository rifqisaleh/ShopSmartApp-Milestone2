import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CartContext } from "./cart";

const Header: React.FC = () => {
  const { isAuthenticated, isLoading, fetchWithAuth } = useAuth();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debugging Logs
  console.log("Header: isAuthenticated =", isAuthenticated);
  console.log("Header: Token in localStorage =", localStorage.getItem("token"));

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) {
        console.log("Skipping user profile fetch: User is not authenticated.");
        return;
      }

      try {
        const response = await fetchWithAuth("auth/profile");
        const data = await response.json();
        console.log("User Profile Data:", data);
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, fetchWithAuth]);

  if (isLoading) {
    return null; // Prevent rendering while loading
  }

  if (!cartContext) {
    return null; // Ensure the header renders only when CartContext is available
  }

  const { cartCount } = cartContext;

  return (
    <header className="bg-urbanChic-50 p-4 flex items-center justify-between">
      {/* Hamburger + Navigation Links */}
      <div className="flex items-center">
        {/* Hamburger Button (Visible on Small Screens) */}
        <button
          className="sm:hidden block text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-icon text-2xl">☰</span>
        </button>

        {/* Navigation Links (Visible on Larger Screens or when Hamburger is Open) */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-urbanChic-50 p-4 sm:static sm:flex sm:items-center sm:space-x-4 sm:w-auto`}
        >
          <ul className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
            <li>
              <Link to="/" className="text-black hover:underline">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-black hover:underline">
                SHOP
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-black hover:underline relative">
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
      </div>

      {/* Logo */}
      <div className="text-3xl font-bold">
        <Link to="/" className="mb-4 text-black hover:underline">
          ShopSmart
        </Link>
      </div>

      {/* Authentication Links */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            {/* Display user name */}
            {userProfile && <span className="text-black">Hello, {userProfile.name}</span>}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-urbanChic-50 px-4 py-8 rounded hover:bg-urbanChic-500 focus:outline-none"
            >
              Dashboard
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-urbanChic-50 px-4 py-8 rounded hover:bg-urbanChic-500 focus:outline-none"
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
