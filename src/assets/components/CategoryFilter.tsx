import React, {useState, useEffect} from 'react';

interface Category {
    id: string,
    name: string;
    image: string;
}

interface CategoryFilterProps{
    onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({onCategoryChange}) => {
const [categories, setCategories] = useState<Category[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

useEffect(() => {
    const fetchCategories = async () =>{
        try{
            const response = await fetch("https://api.escuelajs.co/api/v1/categories");
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
              }
            const data = await response.json();
            setCategories(data);
              } catch (error){
                console.error("Error Fetching Categories:", error);
              }
        };
        fetchCategories();
    }, []);
  
    const handleCategoryChange = (categoryId: string | null) => {
      setSelectedCategory(categoryId);
      onCategoryChange(categoryId);
    };
  
    return (
        <div>
          <button onClick={() => handleCategoryChange(null)}>All</button>
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <button
                key={category.id}
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