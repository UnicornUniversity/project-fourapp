import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    handleUserFetch();
  }, []);

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), //USER DATA
        }
      );

      const serverResponse = await response.json(); //SHOULD BE TOKEN
      console.log(serverResponse);
      if (response.ok) {
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

  async function handleUserFetch() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          withCredentials: true, // Povolit odesílání cookies
        }
      );
      console.log("Data uživatele načtena z API:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Chyba při načítání dat uživatele", error);
      if (error.response && error.response.status === 401) {
        console.error("Neplatný nebo vypršelý token");
        alert("Vaše přihlášení vypršelo. Přihlaste se znovu.");
        window.location.href = "/user/login"; // Přesměrování na přihlášení
      }
    }
  }

  const value = {
    user,
    handlerMap: {
      handleRegister,
      handleLogin,
      handleGoogleLogin,
      handleUserFetch,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
