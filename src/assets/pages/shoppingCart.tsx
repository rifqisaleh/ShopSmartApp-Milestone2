import React, { useContext } from "react";
import { CartContext } from "../components/cart";

const ShoppingCart: React.FC = () => {
  // Access cart state and methods from the context
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <div>Error: Cart context is not available</div>;
  }

  const { cart, updateCart } = cartContext;

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateCart(id, quantity);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total:</strong> $
        {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </div>
    </div>
  );
};

export default ShoppingCart;
