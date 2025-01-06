import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartList extends Product {
  quantity: number;
}

const ShoppingCart: React.FC = () => {
    console.log("ShoppingCart rendered!");
  const [cartList, setCartList] = useState<CartList[]>([]);

  const addToCart = (product: Product) => {
    setCartList((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Update the quantity if the product already exists in the cart
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Add new product to the cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartList.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
