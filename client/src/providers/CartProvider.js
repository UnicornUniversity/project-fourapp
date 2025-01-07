import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider';
import { ProductContext } from './ProductProvider'; // Import ProductContext

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductContext); // Access products from ProductContext

  useEffect(() => {
    if (user && user.id) {
      handleLoad(user.id);
    }
  }, [user]);



  async function handleLoad(userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/users/cart/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const serverResponse = await response.json();
      
      if (response.ok) {
        // Assuming serverResponse contains an array of cart items
        const cartItemsWithDetails = serverResponse.map((cartItem) => {
          // Find the product based on productId
          const product = products.find(p => p._id === cartItem.productId);
          
          // Find the variant based on variantId
          const variant = product?.variants.find(v => v._id === cartItem.variantId);

          // Combine cart item with product and variant details
          return {
            ...cartItem,
            title: product?.name || "Unknown Product", // Fallback if product is not found
            price: product?.price , // Fallback price
            image: variant?.images[0] || '/images/default/image-placeholder.webp', // Use the first image or a placeholder
            color: variant?.color
          };
        });
        console.log(cartItemsWithDetails)
        setCartItems(cartItemsWithDetails);
      } else {
        console.log(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(item) {
    try {
      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.variantId === item.variantId
      );

      if (existingItemIndex !== -1) {
        // If it exists, update the quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += item.quantity;
        setCartItems(updatedCartItems);
      } else {
        // If it doesn't exist, add the new item
        setCartItems((prev) => [...prev, item]);
      }

      const body = JSON.stringify({
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variantId,
      });

      const response = await fetch(
        `http://localhost:5000/api/users/cart/add-item`, // OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: body,
        }
      );

      const serverResponse = await response.json();
      if (!response.ok) {
        console.log(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;