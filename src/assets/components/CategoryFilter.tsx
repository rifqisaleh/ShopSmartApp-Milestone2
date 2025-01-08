import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  onFilterChange: (filters: { 
    categoryId: string | null; 
    searchQuery: string; 
    priceRange: [number, number]; 
  }) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onFilterChange({ categoryId: selectedCategory, searchQuery, priceRange });
  }, [selectedCategory, searchQuery, priceRange, onFilterChange]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap space-x-2">
        <button
          className={`px-4 py-2 rounded ${!selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
