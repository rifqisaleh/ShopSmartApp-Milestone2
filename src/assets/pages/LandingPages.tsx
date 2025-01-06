import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../pages/productList"; // Assuming this interface is correct

const LandingPage: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();
        if (products && products.length > 0) {
          setFeaturedProduct(products[0]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
  
    fetchNewestProducts();
  }, []);
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to ShopSmart!</h1>
      <p className="text-lg text-gray-600 mb-6">Discover our newest and most popular products!</p>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : featuredProduct ? (
        <div className="border rounded-lg shadow-lg p-4 max-w-md w-full text-center">
          <img
            src={
              Array.isArray(featuredProduct.images)
                ? featuredProduct.images[0] // Use the first image in the array
                : featuredProduct.images
            }
            alt={featuredProduct.title}
            className="w-full h-auto rounded mb-4"
          />
          <h2 className="text-xl font-semibold">{featuredProduct.title}</h2>
          <p className="text-gray-600">{featuredProduct.description}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">${featuredProduct.price}</p>
          <button
            className="bg-blue-500 text-white mt-4 px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/product/${featuredProduct.id}`)}
          >
            Check It Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LandingPage;
