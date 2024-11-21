import React from "react";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google"; // URL backendu
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{ padding: "10px", fontSize: "16px" }}
    >
      Přihlásit se přes Google
    </button>
  );
};

export default GoogleLogin;
