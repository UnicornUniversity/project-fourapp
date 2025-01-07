import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider';
import { ProductContext } from './ProductProvider';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.id) {
      handleLoad(user.id);
    }
  }, [user]);

  async function GetProduct(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  async function handleLoad(userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/users/cart/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const serverResponse = await response.json();
      const cartItemsWithDetails = await Promise.all(serverResponse.map(async (cartItem) => {
        const product = await GetProduct(cartItem.productId);
        const variant = product?.variants.find(v => v._id === cartItem.variantId);

        return {
          ...cartItem,
          title: product?.name || "Unknown Product",
          price: product?.price || 0,
          image: variant?.images[0] || '/images/default/image-placeholder.webp',
          color: variant?.color || 'Unknown Color',
        };
      }));

      setCartItems(cartItemsWithDetails);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  }

  async function addToCart(item) {
    try {
      const existingItemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.variantId === item.variantId
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCartItems = [...cartItems, item];
      }

      setCartItems(updatedCartItems);

      const response = await fetch(
        `http://localhost:5000/api/users/cart/add-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
            variantId: item.variantId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
    < CartContext.Provider value={{
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