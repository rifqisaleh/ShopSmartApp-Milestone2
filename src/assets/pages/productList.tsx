import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[] | string | null;
  description?: string;
  category: {
    id: string;
    name: string;
  };
}

// Static category map
const categoryMap: Record<string, string> = {
  "1": "Clothes",
  "2": "Electronics",
  "3": "Furniture",
  "4": "Shoes",
  "5": "Misc",
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
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
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

       // Map category IDs to standardized names and combine Misc categories
       const standardizedCategories = data
  .map((category: { id: string; name: string }) => ({
    id: category.id,
    name: categoryMap[category.id] || "Misc",
  }))
  .reduce(
    (uniqueCategories: { id: string; name: string }[], category: { id: string; name: string }) => {
      // Ensure only one "Misc" category exists
      if (category.name === "Misc") {
        if (!uniqueCategories.some((cat) => cat.name === "Misc")) {
          uniqueCategories.push({ id: "5", name: "Misc" }); // Use "5" for the Misc category
        }
      } else {
        uniqueCategories.push(category);
      }
      return uniqueCategories;
    },
    [] as { id: string; name: string }[]
  );



        setCategories(standardizedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

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

        const processedProducts = data.map((product) => ({
          ...product,
          category: {
            ...product.category,
            id: product.category?.id || "5",
            name: categoryMap[product.category?.id || "5"],
          },
          images: normalizeImages(product.images),
        }));

        setProducts(processedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <CategoryFilter
  categories={categories} // Pass standardized categories
  onFilterChange={({ categoryId, searchQuery, priceRange }) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryId,
      searchQuery,
      priceRange,
    }))
  }
/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
