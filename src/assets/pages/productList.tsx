import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';

interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
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
        
        //filter out "Hyderabad" and broken image array
        const filteredProducts = data.filter((product : Product) => {
          const validImage = Array.isArray(product.images) && product.images.every((image) => {
            return (
              image.startsWith ("http") &&
              !image.includes("\\")
            );
          });
          
          return (
            !product.title.includes("Hyderabad") && validImage
      );
    });
      
    setProducts(filteredProducts);

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

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
};

export default ProductList;

