import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { env } from "../utils/env";

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
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/products/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  async function handleLoad(userId) {
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/users/cart/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const serverResponse = await response.json();
      const cartItemsWithDetails = await Promise.all(
        serverResponse.map(async (cartItem) => {
          const product = await GetProduct(cartItem.productId);
          const variant = product?.variants.find(
            (v) => v._id === cartItem.variantId
          );

          return {
            ...cartItem,
            title: product?.name || "Unknown Product",
            price: product?.price || 0,
            image:
              variant?.images[0] || "/images/default/image-placeholder.webp",
            color: variant?.color || "Unknown Color",
          };
        })
      );

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
        `${env.REACT_APP_API_URL}/api/users/cart/add-item`,
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
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }

  const updateQuantity = async (item, quantity) => {
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/users/cart/update-quantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            variantId: item.variantId,
            productId: item.productId,
            quantity: quantity,
          }),
        }
      );

      if (response.ok) {
        // Update the cart items state
        setCartItems((prev) =>
          prev.map((cartItem) =>
            cartItem.variantId === item.variantId
              ? { ...cartItem, quantity: quantity } // Update the quantity of the matching item
              : cartItem
          )
        );
      } else {
        console.error("Failed to update quantity:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const removeFromCart = async (item) => {
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/users/cart/remove-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: item.productId,
            variantId: item.variantId,
          }),
        }
      );

      if (response.ok) {
        setCartItems((prev) =>
          prev.filter((cartItem) => cartItem.variantId !== item.variantId)
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const toggleFavorite = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === itemId
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
