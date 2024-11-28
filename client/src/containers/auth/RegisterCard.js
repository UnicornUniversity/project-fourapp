import React, { useCallback, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import "./../../assets/styles/auth.css";
import Input from "../../components/input/Input";


function RegisterCard() {
  const { handlerMap } = useContext(UserContext);
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const user = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };
      try {
        await handlerMap.handleRegister(user);
      } catch (error) {
        console.error(error);
      }
    },
    [handlerMap]
  );

  return (
    <Card className="authCard">
      <div>
        <h3>Register</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            className="authInput"
            type="text"
            name="name"
            placeholder="name"
            required
            id="name"
          />
          <Input
            className="authInput"
            type="email"
            name="email"
            placeholder="Email"
            required
            id="email"
          />
          <Input
            className="authInput"
            type="password"
            name="password"
            placeholder="Password"
            required
            id="password"
          />
          <div className="authPassword inputWrapper">
            <p>Forgot password?</p>
          </div>
          <Input
            className="authInput"
            name="submit"
            type="submit"
            required
            value="Sign in"
          />
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
              <span>Already have an account? </span>
              <Link to="/user/login" className="authLink">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default RegisterCard;
