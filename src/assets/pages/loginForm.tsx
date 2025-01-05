import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "asdfk@revou.com",
    password: "12345678",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation

  // Handle changes in input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous error messages

    try {
      // Make API request
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send email and password
        }
      );

      if (!response.ok) {
        // Handle errors
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();

      // Store the access token in localStorage
      localStorage.setItem("access_token", data.access_token);

      // Navigate to the dashboard upon successful login
      navigate("/dashboard");
    } catch (err) {
      // Handle errors and show message to the user
      if (err instanceof Error) {
        setError(err.message); // Display the error message to the user
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Welcome to ShopSmart
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Login to your account
        </p>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-blue-500 focus:border-blue-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-blue-500 focus:border-blue-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium 
                         hover:bg-blue-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-1"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
