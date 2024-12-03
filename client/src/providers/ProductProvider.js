import React, { createContext, useState, useContext } from 'react';

// Create the context
export const ProductContext = createContext();

// Provider Component
export function ProductProvider ({ children }){
  const [products, setProducts] = useState([
        {
          id: "1",
          name: "T-Shirt",
          price: "19.99",
          description: "Comfortable cotton T-Shirt",
          isOnline: true,
          variant: [
            {
              variantId: "1a",
              name: "T-Shirt Small Black",
              size: "S",
              color: "Black",
              stock: 50,
              image: ["/images/tshirt/T-shirt.webp","/images/tshirt/tshirt-2.avif"]
            },
            {
              variantId: "1b",
              name: "T-Shirt Medium Blue",
              size: "M",
              color: "Blue",
              stock: 30,
              image: ["/images/tshirt/navy-t-shirt.webp"]
            }
          ],
          categoryId: ["101"]
        },
        {
          id: "2",
          name: "Jeans",
          price: "49.99",
          description: "Classic denim jeans",
          isOnline: true,
          variant: [
            {
              variantId: "2a",
              name: "Jeans Slim Fit",
              size: "32",
              color: "Blue",
              stock: 25,
              image: ["/images/jeans/jeans.jpg"]
            },
            {
              variantId: "2b",
              name: "Jeans Regular Fit",
              size: "34",
              color: "Black",
              stock: 20,
              image: ["path/to/jeans-regular-black.jpg"]
            }
          ],
          categoryId: ["102"]
        },
        {
          id: "3",
          name: "Sneakers",
          price: "89.99",
          description: "Lightweight running sneakers",
          isOnline: true,
          variant: [
            {
              variantId: "3a",
              name: "Sneakers Red",
              size: "10",
              color: "Red",
              stock: 40,
              image: ["path/to/sneakers-red.jpg"]
            },
            {
              variantId: "3b",
              name: "Sneakers White",
              size: "11",
              color: "White",
              stock: 35,
              image: ["path/to/sneakers-white.jpg"]
            }
          ],
          categoryId: ["103"]
        }
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

