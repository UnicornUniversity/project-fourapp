import React, { createContext, useState, useContext } from 'react';

export const CategoryContext = createContext();

function CategoryProvider(){
const [navbarCategories, setNavbarCategories] = useState()


async function handleLoad(){
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