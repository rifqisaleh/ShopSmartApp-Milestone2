import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onFilterChange: (filters: {
    categoryId: string | null;
    searchQuery: string;
    priceRange: [number, number];
  }) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilterChange,
}) => { console.log("CategoryFilter rendered");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    const filters = { categoryId, searchQuery, priceRange };
    console.log("Filters changed:", filters); // Debugging
    onFilterChange(filters);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    const filters = { categoryId: selectedCategory, searchQuery: query, priceRange };
    console.log("Filters changed:", filters); // Debugging
    onFilterChange(filters);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    const filters = { categoryId: selectedCategory, searchQuery, priceRange: newRange };
    console.log("Filters changed:", filters); // Debugging
    onFilterChange(filters);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap space-x-2">
        <button
          className={`px-4 py-2 rounded ${
            !selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange(category.id)}
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
          onChange={(e) =>
            handlePriceRangeChange([priceRange[0], Number(e.target.value)])
          }
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
