import React, { useContext } from "react";
import { CartContext } from "../components/cart";

const ShoppingCart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <div className="text-red-500">Error: Cart context is not available</div>;
  }

  const { cart, updateCart } = cartContext;

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCart(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    updateCart(id, 0); // Setting quantity to 0 will remove the item
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex flex-col space-y-1">
                {/* Display the product name */}
                <span className="text-lg font-semibold">{item.title}</span>
                {/* Display the product price */}
                <span className="text-gray-600">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-4">
                {/* Input for adjusting quantity */}
                <input
                  type="number"
                  className="w-16 border rounded-md text-center"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                />
                {/* Button to remove item */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Display the total */}
          <div className="text-right text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
