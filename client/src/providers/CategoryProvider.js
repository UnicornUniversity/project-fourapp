import React, { createContext, useState, useContext, useEffect } from 'react';

export const CategoryContext = createContext();

function CategoryProvider({children}){
const [navbarCategories, setNavbarCategories] = useState([])

useEffect(() => {
    handleLoad()
},[])

async function handleLoad(){
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
            setNavbarCategories(serverResponse.categories)
          //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
        } else {
          //console.error("Token verification failed:", data); //SOME ERROR
        }
      } catch (error) {
        //console.error("Error sending token to backend:", error);
      }
}

async function handleLoadSubCategories(){
    try {
        const response = await fetch(
        ""
    
        )
    } catch (error) {
        
    }   
}


    const value = {
        navbarCategories,
        handlerMap:{

        }
    }

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export default CategoryProvider