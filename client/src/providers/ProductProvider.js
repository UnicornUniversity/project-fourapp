import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Provider Component
export function ProductProvider ({ children }){
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({})
  const [filters, setFilters] = useState({})
  const [price , setPrice] = useState({})

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
          getMinMaxPrices(serverResponse.products)
          //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
        } else {
          //console.error("Token verification failed:", data); //SOME ERROR
        }
      } catch (error) {
        //console.error("Error sending token to backend:", error);
      }
}

function getMinMaxPrices(productArray){
  if (productArray.length === 0) return { min: null, max: null };

  const prices = productArray.map(product => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return { min: minPrice, max: maxPrice };
};

async function handleGet(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`, //OUR API ENDPOINT
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    const serverResponse = await response.json(); //SHOULD BE TOKEN¨
    if (response.ok) {
      console.log(serverResponse)
      setProduct(serverResponse)
      //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
    } else {
      //console.error("Token verification failed:", data); //SOME ERROR
    }
  } catch (error) {
    //console.error("Error sending token to backend:", error);
  }
}

const value = {
  filters, products , product, price, handlerMap:{
    setFilters, handleGet , setProducts
  }
}

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;