import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [nextItemId, setNextItemId] = useState(0);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
      setNextItemId(getNextItemId(parsedCartItems));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getNextItemId = (items) => {
    const maxId = items.reduce((max, item) => Math.max(max, item.id), -1);
    return maxId + 1;
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.product_id === product.product_id);

    if (existingItemIndex !== -1) {
      // Item already exists in the cart, increase its quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Item doesn't exist in the cart, add it as a new item
      const newItem = { id: nextItemId, ...product, quantity: 1 };
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
      setNextItemId(nextItemId + 1);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.product_id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item.product_id !== productId);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
