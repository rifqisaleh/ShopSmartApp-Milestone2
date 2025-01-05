import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const { logout } = useAuth(); // Access logout from useAuth
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Unauthorized");
        }

        const response = await fetch(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error.");
        logout(); // Clear the token using useAuth
        navigate("/login");
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate("/login");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-500">
          Welcome, {profile.name}!
        </h1>
        <p className="text-gray-600 text-center mt-2">Email: {profile.email}</p>
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mt-4"
          />
        )}
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                     hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 
                     focus:ring-offset-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
