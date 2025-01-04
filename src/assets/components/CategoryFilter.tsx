import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
  };
}

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryMap: Record<string, string> = {
          "1": "Clothes",
          "2": "Electronics",
          "3": "Furniture",
          "4": "Shoes",
          "5": "Miscellaneous", // Fix "Hyderabad"
        };
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data: Product[] = await response.json();

        // Extract unique categories based on ID and map to proper names
        const uniqueCategories: Category[] = Array.from(
          new Map(
            data.map((product) => [
              product.category.id, // Use category ID as the key
              {
                id: product.category.id,
                name: categoryMap[product.category.id] || "Unknown", // Map ID to name
              },
            ])
          ).values()
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="flex flex-wrap space-x-2">
      <button
        className={`px-4 py-2 rounded ${
          selectedCategory === null ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleCategoryChange(null)}
      >
        All
      </button>
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default CategoryFilter;
