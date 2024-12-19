import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [navbarCategories, setNavbarCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryTree, setCategoryTree] = useState([]);
  const [categoryAllTree, setCategoryAllTree] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() =>{
    handleGetCategoryAllTree();
  },[categories])

  async function handleGet(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        setCategory(serverResponse);
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  async function handleUpdate(id, body) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        setNavbarCategories(serverResponse.categories);
        setCategories(serverResponse.categories);
        // console.log("Token verified successfully:", data); // SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  // Add this useEffect to log the updated category whenever it changes
  async function handleLoad() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories", // OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        setNavbarCategories(serverResponse.categories);
        setCategories(serverResponse.categories);
        // console.log("Token verified successfully:", data); // SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error fetching categories:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleLoad();
      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        console.log("deleted " + id);
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  async function handleCreate(category) {
    const body = JSON.stringify(category);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories`, // OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      handleLoad();
      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        navigate("/user/profile/admin");
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  async function handleGetCategoryTree(category_id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${category_id}/tree`, // OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        setCategoryTree(serverResponse);
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  async function handleGetCategoryAllTree() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/alltree`, // OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const serverResponse = await response.json(); // SHOULD BE TOKEN
      if (response.ok) {
        setCategoryAllTree(serverResponse);
      } else {
        // console.error("Token verification failed:", data); // SOME ERROR
      }
    } catch (error) {
      // console.error("Error sending token to backend:", error);
    }
  }

  const value = {
    navbarCategories,
    categories,
    categoryTree,
    category,
    categoryAllTree,
    handlerMap: {
      handleDelete,
      handleCreate,
      handleGet,
      handleGetCategoryTree,
      handleLoad,
      handleUpdate,
      // Added handleUpdate to the handlerMap
    },
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
