import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [navbarCategories, setNavbarCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);

  useEffect(() => {
    handleLoad();
    handleGetCategoryTree();
  }, []);

  const navigate = useNavigate();

  async function handleGet(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`, //OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        //console.log(serverResponse)
        return serverResponse;
        //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleLoad() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories", //OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        setNavbarCategories(serverResponse.categories);
        setCategories(serverResponse.categories);
        //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`, //OUR API ENDPOINT
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleLoad();
      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        console.log("deleted " + id);
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleCreate(category) {
    const body = JSON.stringify(category);
    console.log(body);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/`, //OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      handleLoad();
      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        navigate("/user/profile/admin");
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleGetCategoryTree(category_id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${category_id}/tree`, //OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const serverResponse = await response.json(); //SHOULD BE TOKEN¨
      if (response.ok) {
        setCategoryTree(serverResponse);
        console.log(serverResponse);
        console.log(categoryTree);
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  const value = {
    navbarCategories,
    categories,
    categoryTree,
    handlerMap: {
      handleDelete,
      handleCreate,
      handleGet,
      handleGetCategoryTree,
    },
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
