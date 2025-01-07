import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (item) => {
    // Check if item already exists in wishlist
    if (wishlistItems.some(wishlistItem => wishlistItem.id === item.id)) {
      return;
    }
    
    const wishlistItem = {
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      title: item.title,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.image
    };

    setWishlistItems(prev => [...prev, wishlistItem]);
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.productId === itemId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const moveToCart = (itemId, addToCart) => {
    const item = wishlistItems.find(item => item.id === itemId);
    if (item && addToCart) {
      addToCart({
        ...item,
        quantity: 1
      });
      removeFromWishlist(itemId);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      moveToCart
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook for using wishlist context
export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistProvider;