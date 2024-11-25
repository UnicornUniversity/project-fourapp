import React, { useCallback, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Card from "../../components/card/Card";
import "./../../assets/styles/login.css";

function LoginCard() {
  const { handlerMap } = useContext(UserContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const user = {
        email: formData.get("email"),
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
    <Card className="loginCard">
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <p>Forgot password?</p>
          </div>
          <div>
            <input type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    </Card>
  );
}

export default LoginCard;
