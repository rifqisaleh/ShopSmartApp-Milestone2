import React, { createContext, useState, ReactNode, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  cartCount: number; // Add cart count
  addToCart: (product: Product) => void;
  updateCart: (productId: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      quantity > 0
        ? prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        : prevCart.filter((item) => item.id !== productId)
    );
  };

  // Calculate the total number of items in the cart
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );


  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;