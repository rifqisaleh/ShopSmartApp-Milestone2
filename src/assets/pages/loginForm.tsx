import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="peer w-full p-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="peer w-full p-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>
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