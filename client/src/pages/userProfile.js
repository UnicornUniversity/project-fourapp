import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // API volání pro získání dat uživatele
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

        // Zpracování chyby při neplatném tokenu
        if (error.response && error.response.status === 401) {
          console.error("Neplatný nebo vypršelý token");
          alert("Vaše přihlášení vypršelo. Přihlaste se znovu.");
          window.location.href = "/login"; // Přesměrování na přihlášení
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <p>Načítání...</p>;

  return (
    <div>
      <h1>Vítejte, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
