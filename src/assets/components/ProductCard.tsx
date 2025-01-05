import React from "react";
import { Product } from "../pages/productList"; // Use the imported Product interface
import { Link } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.jpeg";

  console.log(product.images);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      {/* Wrap the entire card with a Link */}
      <Link to={`/product/${product.id}`}>
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-40 object-cover mb-2 rounded"
          onError={(e) => (e.currentTarget.src = "/placeholder.png")} // Fallback for broken images
        />
        <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
      </Link>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;