import React, { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId, quantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const toggleFavorite = (itemId) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      toggleFavorite 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;