import { createContext, useState } from "react";
export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  async function handleRegister(user) {
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
      console.log(serverResponse);
      if (response.ok) {
        //console.log("Token verified successfully:", data); //WENT THROUGH RESPONSE
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleLogin(user) {
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

      console.log(serverResponse);
      if (response.ok) {
        setUser(response.user);
        console.log(response.user);
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

  const value = {
    user,
    handlerMap: {
      handleRegister,
      handleLogin,
      handleGoogleLogin,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
