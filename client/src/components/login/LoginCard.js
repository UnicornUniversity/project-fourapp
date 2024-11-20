import React, { useCallback, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import "./../../assets/styles/login.css";

function LoginCard() {
  const { handlerMap } = useContext(UserContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const user = {
        title: formData.get("title"),
        password: formData.get("password"),
      };
      try {
        await handlerMap.handleLogin(user);
      } catch (error) {
        console.error(error);
      }
    },
    [handlerMap]
  );

  return (
    <div className="loginCard">
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" id="email" required />
          <input type="password" placeholder="Password" required />
          <p>Forgot password?</p>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
