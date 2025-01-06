import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string | string[];
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
        console.log("Updated API Response:", data);

        const filteredProducts = data.filter((product) => {
          const hasValidImage =
            Array.isArray(product.images)
              ? product.images.length > 0
              : typeof product.images === "string" && product.images.length > 0;
          return hasValidImage;
        });

        setProducts(filteredProducts);
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
