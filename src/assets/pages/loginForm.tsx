import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
  
    try {
      console.log("Login Payload:", formData);
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Invalid credentials. Please try again.");
      }
  
  
      const data = await response.json();
    console.log("Token Received:", data.access_token);

    // Validate the token by making a test authenticated request
    const validationResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (!validationResponse.ok) {
      throw new Error("Token validation failed.");
    }

    console.log("Token validated successfully.");

    // Call login only after validation succeeds
    console.log("Calling login function with token:", data.access_token);
    login(data.access_token);
    navigate("/dashboard");
  } catch (err) {
    console.error("Login failed:", err);
    setError(err instanceof Error ? err.message : "An unexpected error occurred.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Welcome to ShopSmart
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Login to your account
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

