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
  const [filters, setFilters] = useState<{
    categoryId: string | null;
    searchQuery: string;
    priceRange: [number, number];
  }>({
    categoryId: null,
    searchQuery: "",
    priceRange: [0, 500],
  });
  const [error, setError] = useState<string | null>(null);

  const normalizeImages = (images: string[] | string | null | undefined): string[] => {
    if (!images) return [];
    if (Array.isArray(images)) {
      return images.filter((url) => typeof url === "string" && url.startsWith("http"));
    }
    return [];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = filters.categoryId
          ? `https://api.escuelajs.co/api/v1/products/?categoryId=${filters.categoryId}`
          : "https://api.escuelajs.co/api/v1/products";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: Product[] = await response.json();

        // Apply search and price filters
        const filteredProducts = data
          .filter((product) => product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()))
          .filter((product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

        const processedProducts = filteredProducts.map((product) => ({
          ...product,
          images: normalizeImages(product.images),
        }));

        setProducts(processedProducts);
      } catch (error) {
        console.error("Error Fetching Products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, [filters]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <CategoryFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
