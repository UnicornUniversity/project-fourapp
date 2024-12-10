import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Provider Component
export function ProductProvider ({ children }){
  const [products, setProducts] = useState([

  ]);

useEffect(() =>{
handleLoad()
},[])

  async function handleLoad(){
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

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;