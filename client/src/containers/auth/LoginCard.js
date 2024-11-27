import React, { useCallback, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import "./../../assets/styles/auth.css";

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
    <Card className="authCard">
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <input
              className="formInput"
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              required
            />
          </div>
          <div className="inputWrapper">
            <input
              className="formInput"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="password inputWrapper">
            <p>Forgot password?</p>
          </div>
          <div className="inputWrapper">
            <input type="submit" value="Sign in" className="formButton" />
          </div>

          <div className="inputWrapper">
            <div className="authSocial">
              <i
                class="fa-brands fa-google"
                onClick={() => handlerMap.handleGoogleLogin()}
              ></i>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-x-twitter"></i>
            </div>
            <div className="accountText">
              <span>Don’t have an account? </span>
              <Link to="/user/register" className="registerLink">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default LoginCard;
