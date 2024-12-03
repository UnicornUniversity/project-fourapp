import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

function UserProvider({ children }) {
  async function handleRegister( user ) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register", //OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), //USER DATA
        }
      );

      const serverResponse = await response.json();
      console.log(serverResponse)
      if (response.ok) {
        navigate("/user/login");
        //console.log("Token verified successfully:", data); //WENT THROUGH RESPONSE
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleLogin( user ) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login", //OUR API ENDPOINT
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), //USER DATA
        }
      );

      const serverResponse = await response.json(); //SHOULD BE TOKEN
      console.log(serverResponse)
      if (response.ok) {
        navigate("/user/profile");
        //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleGoogleLogin() {
    try {
      window.location.href = "http://localhost:5000/api/auth/google"; // URL backendu
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  // Mock user data
  const [user, setUser] = useState({
    first_name: "Karel",
    last_name: "Mácha",
    email: "karel.macha@example.com",
    phone_number: "123-456-7890",
    dob: "1990-01-01",
    role: "admin",
  });

  const updateUserProfile = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const value = {
    user,
    handlerMap: {
      handleRegister,
      handleLogin,
      handleGoogleLogin,
      updateUserProfile,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
