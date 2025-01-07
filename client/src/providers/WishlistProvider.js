import React, { createContext, useState, useCallback } from 'react';

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add an item to the wishlist
  const addToWishlist = useCallback((item) => {
    // Check if the item already exists in the wishlist
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
      image: item.image,
    };

    setWishlistItems((prev) => [...prev, wishlistItem]);
  }, [wishlistItems]);

  // Remove an item from the wishlist
  const removeFromWishlist = useCallback((itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Check if an item is in the wishlist
  const isInWishlist = useCallback((itemId) => {
    return wishlistItems.some((item) => item.id === itemId);
  }, [wishlistItems]);

  // Clear the entire wishlist
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  // Move an item from the wishlist to the cart
  const moveToCart = useCallback((itemId, addToCart) => {
    const item = wishlistItems.find((item) => item.id === itemId);
    if (item && typeof addToCart === 'function') {
      try {
        addToCart({
          ...item,
          quantity: 1,
        });
        removeFromWishlist(itemId);
      } catch (error) {
        console.error('Error moving item to cart:', error);
      }
    }
  }, [wishlistItems, removeFromWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        moveToCart,
      }}
    >
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