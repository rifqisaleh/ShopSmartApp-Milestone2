import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = categoryId
        ?`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
        :"https://api.escuelajs.co/api/v1/products";
        const response = await fetch (url);
        const data = await response.json();
        console.log("Product data:", data); // Debug: check the structure of products
        setProducts(data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
       {/* Render the CategoryFilter */}
       <CategoryFilter onCategoryChange={setCategoryId} />

{/* Render the Product List */}

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <h3>{product.category.name}</h3> {/* Render category name */}
          <p>${product.price}</p>
          <img src={product.image} alt={product.title} />
          <img src={product.category.image} alt={product.category.name} /> {/* Optional: category image */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;