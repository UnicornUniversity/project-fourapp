import { createContext, useState } from "react";
import { resolvePath } from "react-router-dom";

export const UserContext = createContext();

function UserProvider({ children }) {
  // Mock user data
  const [user, setUser] = useState({
    first_name: "Karel",
    last_name: "Mácha",
    email: "karel.macha@example.com",
    phone_number: "123-456-7890",
    dob: "1990-01-01",
    role: "admin"
  });

  const updateUserProfile = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    user,
    handlerMap: {
      handleRegister: () => {},
      handleLogin: () => {},    
      handleGoogleLogin: () => {}, 
      updateUserProfile        
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;