import React, { useCallback, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import "./../../assets/styles/login.css";

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
    <div className="registerCard">
      <div>
        <h3>Register</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <p>Forgot password?</p>
          <input type="submit" value="Sign up"/>
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;
