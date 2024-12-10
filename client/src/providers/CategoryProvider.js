import React, { createContext, useState, useContext } from 'react';

export const CategoryContext = createContext();

function CategoryProvider({children}){
const [navbarCategories, setNavbarCategories] = useState([{name:"Men"},{name:"Women"},{name:"Kids"},{name:"Everyone"}])


async function handleLoad(){
try {
    const response = await fetch(
    ""

    )
} catch (error) {
    
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