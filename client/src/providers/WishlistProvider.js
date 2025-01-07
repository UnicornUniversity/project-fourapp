import React, { createContext, useState , useEffect, useContext } from 'react';
import { UserContext } from './UserProvider';
import { ProductContext } from './ProductProvider'; // Import ProductContext
export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  useEffect(() => {
    if (user && user.id) {
      handleLoad(user.id);
    }
  }, [user]);

  async function handleLoad(userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/users/wishlist/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const serverResponse = await response.json();
      
      if (response.ok) {
        // Assuming serverResponse contains an array of wishlist items
        const wishlistItemsWithDetails = serverResponse.map((wishlistItem) => {
          // Find the product based on productId
          const product = products.find(p => p._id === wishlistItem.productId);
          
          // Find the variant based on variantId
          const variant = product?.variants.find(v => v._id === wishlistItem.variantId);
  
          // Combine wishlist item with product and variant details
          return {
            ...wishlistItem,
            title: product?.name || "Unknown Product", // Fallback if product is not found
            price: product?.price , // Fallback price
            image: variant?.images[0] || '/images/default/image-placeholder.webp', // Use the first image or a placeholder
            color: variant?.color,
            size: variant?.size,
          };
        });
        console.log(wishlistItemsWithDetails)
        setWishlistItems(wishlistItemsWithDetails);
      } else {
        console.log(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const addToWishlist = async (item) => {
    // Check if item already exists in wishlist
    if (wishlistItems.some(wishlistItem => wishlistItem.variantId === item.variantId)) {
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

    const body = {
      productId: item.productId,
      variantId: item.variantId,
    }
    try {
      // Make API call to add item to wishlist
      const response = await fetch('http://localhost:5000/api/users/wishlist/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }
      // If the API call is successful, update the local state
      setWishlistItems(prev => [...prev, wishlistItem]);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const removeFromWishlist = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/wishlist/remove-item`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          productId:item.productId,
          variantId:item.variantId
        })
      });
      if (response.ok) {
        setWishlistItems((prev) => prev.filter((wishlistItem) => wishlistItem.variantId !== item.variantId));
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.variantId === itemId);
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

export default WishlistProvider;