import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Product } from "../pages/productList"; // Assuming this interface is correct

// Add or import the categoryMap from ProductList or a utility file
const categoryMap: Record<string, string> = {
  "1": "Clothes",
  "2": "Electronics",
  "3": "Furniture",
  "4": "Shoes",
  "5": "Misc",
};

const LandingPage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();

        // Get unique products for the carousel
        const uniqueFeaturedProducts = new Map();
        products.forEach((product) => {
          if (
            !uniqueFeaturedProducts.has(product.category?.id) &&
            uniqueFeaturedProducts.size < 3
          ) {
            uniqueFeaturedProducts.set(product.category?.id, product);
          }
        });

        // Get unique products for the category section
        const uniqueCategoryProducts = new Map();
        products.forEach((product) => {
          if (
            !uniqueCategoryProducts.has(product.category?.id) &&
            uniqueCategoryProducts.size < 4
          ) {
            uniqueCategoryProducts.set(product.category?.id, product);
          }
        });

        setFeaturedProducts(Array.from(uniqueFeaturedProducts.values()));
        setCategoryProducts(Array.from(uniqueCategoryProducts.values()));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchProducts();
  }, []);

  const getFirstImage = (images: string[] | string | null): string | undefined => {
    if (Array.isArray(images)) {
      return images.length > 0 ? images[0] : undefined; // Get first image in array
    }
    return typeof images === "string" ? images : undefined; // Handle single string or null
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-urbanChic-100  flex flex-col items-center p-6">
      {/* Welcome Section */}
      <div className="bg-urbanChic-100 flex flex-col sm:flex-row items-center w-full max-w-7xl mt-16 mb-16">
        {/* Left Section */}
        <div className="sm:w-1/2 p-4">
          <h1 className="text-5xl font-bold mb-4 text-urbanChic-600">Welcome to ShopSmart!</h1>
          <p className="text-lg text-gray-700">
            Discover amazing products from a variety of categories.
          </p>
        </div>

        {/* Right Section: Carousel */}
        <div className="sm:w-1/2 p-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Slider {...settings}>
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={getFirstImage(product.images) || "/placeholder.jpeg"}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded mb-2 hover:opacity-90 transition-opacity"
                  />
                  <h2 className="text-xl font-semibold text-center">{product.title}</h2>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      {/* Category Section */}
      <div className="w-full max-w-7xl mt-16 mb-16">
        <h2 className="text-4xl text-urbanChic-600 mb-16 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* Product Image (Clickable) */}
              <img
                src={getFirstImage(product.images) || "/placeholder.jpeg"}
                alt={product.title}
                className="w-full h-40 object-contain hover:scale-105 transition-transform"
                onClick={() => navigate(`/shop?category=${product.category?.id}`)} // Navigate to shop with category filter
              />

              {/* Category Name */}
              <span className="mt-2 text-sm text-gray-600 font-medium">
                {categoryMap[product.category?.id || "5"]} {/* Use mapped category name */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
