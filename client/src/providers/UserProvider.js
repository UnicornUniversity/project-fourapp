import { createContext } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  async function handleRegister({ user }) {
    try {
      const response = await fetch(
        "https://your-backend-api.com/verify-token", //OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "", //USER DATA
        }
      );

      const serverResponse = await response.json();

      if (response.ok) {
        //console.log("Token verified successfully:", data); //WENT THROUGH RESPONSE
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  async function handleLogin({ user }) {
    try {
      const response = await fetch(
        "https://your-backend-api.com/verify-token", //OUR API ENDPOINT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "", //USER DATA
        }
      );

      const serverResponse = await response.json(); //SHOULD BE TOKEN

      if (response.ok) {
        //console.log("Token verified successfully:", data); //SAVE TOKEN TO LOCAL BROWSER STORAGE ?
      } else {
        //console.error("Token verification failed:", data); //SOME ERROR
      }
    } catch (error) {
      //console.error("Error sending token to backend:", error);
    }
  }

  const value = {
    handlerMap: {
      handleRegister,
      handleLogin,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
