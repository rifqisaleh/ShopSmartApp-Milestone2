import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CartContext } from "./cart";

const Header: React.FC = () => {
  const { isAuthenticated, isLoading, fetchWithAuth } = useAuth(); // Access authentication methods and state
  const navigate = useNavigate(); // Allows navigation between routes
  const cartContext = useContext(CartContext); // Access the shopping cart context
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null); // Store the user's profile
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage the state of the hamburger menu

  // Toggle the hamburger menu state
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  // Fetch the user's profile when authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) {
        console.log("Skipping user profile fetch: User is not authenticated.");
        return;
      }

      try {
        const response = await fetchWithAuth("auth/profile"); // Fetch profile data using the authenticated request
        const data = await response.json();
        console.log("User Profile Data:", data);
        setUserProfile(data); // Store the fetched user profile
      } catch (error) {
        console.error("Error fetching user profile:", error); // Log any errors during the fetch
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, fetchWithAuth]);

  // Prevent rendering the header while loading
  if (isLoading) {
    return null;
  }

  // Ensure the CartContext is available before rendering
  if (!cartContext) {
    return null;
  }

  const { cartCount } = cartContext; // Get the cart item count from context

  return (
    <header className="bg-urbanChic-50 p-4 flex items-center justify-between">
      {/* Hamburger + Navigation Links */}
      <div className="flex items-center">
        {/* Hamburger Button */}
        <button
          className="sm:hidden block text-black"
          onClick={handleMenuToggle}
        >
          <span className="hamburger-icon text-2xl">☰</span>
        </button>

        {/* Navigation Links */}
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
            <li>
              {isAuthenticated ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-black hover:underline"
                >
                  DASHBOARD
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="text-black hover:underline"
                >
                  LOGIN
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Logo */}
      <div className="text-3xl font-bold">
        <Link to="/" className="mb-4 text-black">
          ShopSmart
        </Link>
      </div>

      {/* Authentication Links */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <span className="text-black">
            Welcome, <strong>{userProfile?.name || "User"}</strong> {/* Replace "User" with actual name from context */}
          </span>
        ) : (
          <span className="text-gray-500">Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
