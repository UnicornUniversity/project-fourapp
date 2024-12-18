import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleGet,
  handleUpdate,
  handleLoad,
  handleDelete,
  handleCreate,
  handleGetCategoryTree,
  handleGetCategoryAllTree,
} from "../features/categories/api";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [navbarCategories, setNavbarCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryTree, setCategoryTree] = useState([]);
  const [categoryAllTree, setCategoryAllTree] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleLoad().then((response) => {
      setNavbarCategories(response.categories);
      setCategories(response.categories);
    });

    handleGetCategoryAllTree().then((response) => {
      setCategoryAllTree(response);
    });
  }, []);

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
    },
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
