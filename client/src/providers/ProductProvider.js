import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../utils/env";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsAP, setProductsAP] = useState();
  const [recentProducts, setRecentProducts] = useState();
  const [product, setProduct] = useState();
  const [filters, setFilters] = useState({
  });
  const [category, setCategory] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    handleLoad();
    handleLoadAP();
    handleGetRecent();
  }, [filters, category]);

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleLoadAP();
      //const serverResponse = await response.json();
      if (response.ok) {
        console.log("deleted " + id);
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  }

  async function handleLoad() {
    // Construct the query parameters conditionally
    const queryParams = new URLSearchParams();

    // Add minPrice if it exists
    if (filters.minPrice != null) {
        queryParams.append("minPrice", filters.minPrice);
    }

    // Add maxPrice if it exists
    if (filters.maxPrice != null) {
        queryParams.append("maxPrice", filters.maxPrice);
    }

    // Add category if it exists
    if (category) {
        queryParams.append("categories[]", category);
    }

    // Add colors if they exist
    if (filters.colors && filters.colors.length > 0) {
        // Append each color as a separate query parameter
        filters.colors.forEach((color) => queryParams.append("colors[]", color));
    }

    // Add sizes if they exist
    if (filters.sizes && filters.sizes.length > 0) {
        // Append each size as a separate query parameter
        filters.sizes.forEach((size) => queryParams.append("sizes[]", size));
    }

    try {
        // Fetch products from the backend
        const response = await fetch(
            `http://localhost:5000/api/products?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Parse the response
        const serverResponse = await response.json();

        if (response.ok) {
            // Filter out products that have no variants or isOnline is false
            const filteredProducts = serverResponse.products.filter(
                (product) =>
                    product.variants &&
                    product.variants.length > 0 &&
                    product.isOnline !== false
            );

            // Update the products state
            setProducts(filteredProducts); // Assuming setProducts is defined in your component
        } else {
            console.error("Error fetching products:", serverResponse);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


  async function handleLoadAP() {
    try {
      const response = await fetch(`${env.REACT_APP_API_URL}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const serverResponse = await response.json();
      if (response.ok) {
        setProductsAP(serverResponse.products);
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  }

  async function handleGet(id) {
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

      const serverResponse = await response.json();
      if (response.ok) {
        setProduct(serverResponse);
        return serverResponse;
        // console.log("Server response:", serverResponse);
      } else {
        console.error("Failed to fetch product:", serverResponse);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
  async function handleUpdate(product, id) {
    try {

      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      handleLoad();
      const serverResponse = await response.json();
      if (serverResponse.ok) {
        await handleLoad();

      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  async function handleGetRecent() {
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/products/latest`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json();

      if (response.ok) {
        // Filter out products that have no variants or isOnline is false
        const filteredProducts = serverResponse.products.filter(
          (product) =>
            product.variants &&
            product.variants.length > 0 &&
            product.isOnline !== false
        );
        setRecentProducts(filteredProducts); // Assuming setRecentProducts is defined in your component
      }
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
  }

  async function handleCreate(product) {
    try {
      const response = await fetch(`${env.REACT_APP_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const serverResponse = await response.json();
      if (response.ok) {
        navigate("/user/profile/admin");
        await handleLoad();
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  const value = {
    filters,
    products,
    recentProducts,
    product,
    productsAP,
    category,
    handlerMap: {
      setFilters,
      handleGet,
      setProducts,
      handleDelete,
      handleCreate,
      handleUpdate,
      setCategory
    },
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductProvider;
