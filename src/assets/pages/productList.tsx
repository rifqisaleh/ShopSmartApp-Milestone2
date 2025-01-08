import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[] | string | null;
  description?: string;
  category?: {
    id: string;
    name: string;
  };
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to normalize images from various formats
  const normalizeImages = (images: string[] | string | null | undefined): string[] => {
    if (!images) return []; // Handle null or undefined
    if (Array.isArray(images)) {
      // Filter valid URLs
      return images.filter((url) => typeof url === "string" && url.startsWith("http"));
    }
  
    return []; // Return empty array for unsupported types
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = categoryId
          ? `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
          : "https://api.escuelajs.co/api/v1/products";

        console.log("Fetching from URL:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: Product[] = await response.json();

        const processedProducts = data.map((product) => ({
          ...product,
          images: normalizeImages(product.images), // Normalize images
        }));


        setProducts(processedProducts);
      } catch (error) {
        console.error("Error Fetching Products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <CategoryFilter onCategoryChange={setCategoryId} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
