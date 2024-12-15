import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Provider Component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [product, setProduct] = useState()
  const [filters, setFilters] = useState({})


  useEffect(() => {
    handleLoad()
  }, [])

  useEffect(() => {
    handleGetRecent()
  }, [])

  async function handleLoad() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products", //OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        setProducts(serverResponse.products)
        //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleGet(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`, // OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json(); // SHOULD BE TOKEN¨
      if (response.ok) {
        setProduct(serverResponse); // Update state
        console.log("Server response:", serverResponse); // Log the fetched product directly
      } else {
        console.error("Failed to fetch product:", serverResponse);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
  async function handleGetRecent() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/latest`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json();
      //console.log(serverResponse);
      if (response.ok) {
        setRecentProducts(serverResponse); // Update state
        //console.log(recentProducts);
        //console.log("Server response:", serverResponse); // Log the fetched product directly
      } else {
        //console.error("Failed to fetch product:", serverResponse);
      }
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
  }


  const value = {
    filters, products, product, recentProducts, handlerMap: {
      setFilters, handleGet, setProducts
    }
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;