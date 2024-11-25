import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import NavBar from "../containers/header/NavBar";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <p>Načítání...</p>;

  return (
    <div className="login">
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Vítejte, {user.name}!</h1>
        <p>Email: {user.email}</p>
      </main>
      <footer></footer>
    </div>
  );
};

export default Profile;
