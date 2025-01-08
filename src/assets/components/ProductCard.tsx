import React, {useContext} from "react";
import { Product } from "../pages/productList"; 
import { Link } from "react-router-dom";
import { CartContext } from "./cart";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.jpeg";
  const { addToCart } = useContext(CartContext) ||{};
  
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product);
    } else {
      console.error("CartContext is not available");
    }
  };
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      
      <Link to={`/product/${product.id}`}>
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-40 object-cover mb-2 rounded"
          onError={(e) => {
            console.error("Image failed to load:", imageUrl);
            e.currentTarget.src = "/placeholder.jpeg";
          }} // Fallback for broken URLs
        />
        <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
      </Link>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button 
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;