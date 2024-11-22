import React from "react";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const GoogleLogin = () => {
  const { handlerMap } = useContext(UserContext);

  return (
    <button onClick={() => handlerMap.handleGoogleLogin()}>
      Přihlásit se přes Google
    </button>
  );
};

export default GoogleLogin;
