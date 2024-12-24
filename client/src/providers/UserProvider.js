import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get("token");
      if (newToken !== token) {
        setToken(newToken); // Update state when the token changes
        //console.log('Token updated:', newToken);
      }
    }, 500); // Poll every 500ms (adjust as needed)

    return () => clearInterval(interval); // Cleanup
  }, [token]);

  useEffect(() => {
    //console.log("here")
    getUser();
  }, [token]);

  async function getUser() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/user", //OUR API ENDPOINT
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const serverResponse = await response.json();
      //console.log(serverResponse)
      if (response.ok) {
        setUser(serverResponse);
      } else {
      }
    } catch (error) {}
  }

  async function handleUpdate(_id, body) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${_id}`, //OUR API ENDPOINT
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const serverResponse = await response.json();
      console.log(serverResponse);
      if (response.ok) {
        getUser();
      } else {
      }
    } catch (error) {}
  }

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
        navigate("/user/login");
        //console.log("Token verified successfully:", data); //WENT THROUGH RESPONSE
      } else {
        //console.error("Token verification failed:"); //SOME ERROR
        setError(serverResponse);
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

  const updateUserProfile = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const value = {
    user,
    error,
    handlerMap: {
      handleRegister,
      handleLogin,
      handleGoogleLogin,
      updateUserProfile,
      handleUpdate,
      setError,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
