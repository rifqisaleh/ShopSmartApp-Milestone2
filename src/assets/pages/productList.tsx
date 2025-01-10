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
export const categoryMap: Record<string, string> = {
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}categories`);
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
            (
              uniqueCategories: { id: string; name: string }[],
              category: { id: string; name: string }
            ) => {
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
        const baseUrl = `${import.meta.env.VITE_API_URL}products`;
        const url = filters.categoryId
          ? `${baseUrl}/?categoryId=${filters.categoryId}`
          : baseUrl;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
  
        const data: Product[] = await response.json();
        console.log("Fetched Products:", data); // Debugging log

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

  const displayedProducts = products.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(filters.searchQuery.toLowerCase());
    const withinPriceRange =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
  
    return matchesSearchQuery && withinPriceRange;
  });

  return (
    <div className="flex p-4 space-x-4">
      {/* Filters Section */}
      <div className="w-1/4 space-y-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
          }
          className="w-full p-2 border rounded-md"
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          onFilterChange={(updatedFilters) =>
            setFilters((prev) => ({ ...prev, ...updatedFilters }))
          }
        />

        {/* Price Range */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              }))
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="w-3/4 grid grid-cols-3 gap-4">
  {error && <p className="text-red-500">{error}</p>}
  {displayedProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
    </div>
  );
};

export default ProductList;