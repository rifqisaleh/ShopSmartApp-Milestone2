import React, { useState } from 'react';

interface CartList {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const [cartList, setCartList] = useState<CartList[]>([]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {/* Render cartList items here */}
    </div>
  );
};

export default ShoppingCart;