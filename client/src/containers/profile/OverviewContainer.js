import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ProfileOverviewContainer() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    navigate("/user/login"); // Redirect to the login page
  };

  return (
    <div className="profileOverviewForm">
      <h2 class="titleMargin">Profile</h2>
      <form>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
          value={user.name || ""}
          disabled
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="email"
          className="profileInput"
          placeholder="Email"
          value={user.email || ""}
          name="email"
          disabled
        >
          <label className="inputLabel">Email</label>
        </Input>
        <Button
          buttonText="Logout"
          className="logoutButton"
          onClick={handleLogout} // Add the logout handler
        />
      </form>
    </div>
  );
}

export default ProfileOverviewContainer;
