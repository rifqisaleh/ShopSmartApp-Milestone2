import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CartContext } from "./cart";

const Header: React.FC = () => {
  const { isAuthenticated, isLoading, fetchWithAuth } = useAuth();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  // Debugging Logs
  console.log("Header: isAuthenticated =", isAuthenticated);
  console.log("Header: Token in localStorage =", localStorage.getItem("token"));

  // Fetch user profile only if the user is authenticated
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWithAuth("auth/profile");
        const userData = await response.json();
        console.log("User Profile Data:", userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!isLoading && isAuthenticated) {
      fetchUserProfile();
    } else {
      console.log("Skipping user profile fetch: User is not authenticated.");
    }
  }, [isLoading, isAuthenticated, fetchWithAuth]);

  // Show a loading indicator while checking authentication state
  if (isLoading) {
    return (
      <header className="bg-urbanChic-50 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Loading...</div>
      </header>
    );
  }

  if (!cartContext) {
    console.warn("CartContext is not available. Skipping header rendering.");
    return null;
  }

  const { cartCount } = cartContext;

  return (
    <header className="bg-urbanChic-50 text-white p-4 flex justify-between items-center">
      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="mb-4 text-black hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/shop" className="mb-4 text-black hover:underline">
              SHOP
            </Link>
          </li>
          <li>
            <Link to="/cart" className="mb-4 text-black hover:underline relative">
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

      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/" className="mb-4 text-black hover:underline">
          ShopSmart
        </Link>
      </div>

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
