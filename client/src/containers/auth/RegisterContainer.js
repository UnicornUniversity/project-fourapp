import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import "./../../assets/styles/auth.css";
//import "./../../assets/styles/tooltip.css"; // Custom styles for the tooltip
import Input from "../../components/input/Input";

function RegisterContainer() {
  const { handlerMap } = useContext(UserContext);

  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const user = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      const passwordPattern = /^(?=.*\d).{6,}$/;

      const newErrors = { name: "", email: "", password: "" };

      if (!user.name.trim()) {
        newErrors.name = "Name is required.";
      }

      if (!emailPattern.test(user.email)) {
        newErrors.email = "Invalid email format.";
      } else if (user.email === "example@example.com") {
        newErrors.email = "Email already in use.";
      }

      if (!passwordPattern.test(user.password)) {
        newErrors.password =
          "Password must be at least 6 characters long and include at least one number.";
      }

      setErrors(newErrors);

      if (newErrors.name || newErrors.email || newErrors.password) {
        return;
      }

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
      <div className="authTitle">
        <h3>Register</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          className="authInput"
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          errorMessage={errors.name}
        />

        <Input
          className="authInput"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          errorMessage={errors.email}
        />

        <Input
          className="authInput"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          errorMessage={errors.password}
        />

        <div className="authPassword inputWrapper">
          <p>Forgot password?</p>
        </div>

        <Input
          className="authInput"
          name="submit"
          type="submit"
          required
          value="Sign up"
        />

        <div className="inputWrapper">
          <div className="authSocial">
            <i
              className="fa-brands fa-google"
              onClick={() => handlerMap.handleGoogleLogin()}
            ></i>
          </div>
          <div className="authText">
            <span>Already have an account? </span>
            <Link to="/user/login" className="authLink">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default RegisterContainer;
