import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function ProfileSidebarContainer() {
  const navigate = useNavigate();
  return (
    <div className="profileSidebar">
      <Button
        onClick={() => navigate("/user/profile")}
        buttonText="Profile"
        className="profileSidebarButton"
      >
        <i className="fa-solid fa-user"></i>
      </Button>
      <Button
        onClick={() => navigate("/user/profile/update")}
        buttonText="Update"
        className="profileSidebarButton"
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>
      <Button
        onClick={() => navigate("/user/profile/orders")}
        buttonText="Orders"
        className="profileSidebarButton"
      >
        <i className="fa-solid fa-list"></i>
      </Button>
      <Button
        onClick={() => navigate("/user/profile/wishlist")}
        buttonText="Wishlist"
        className="profileSidebarButton"
        >
        <i className="fa-solid fa-heart"></i>
      </Button>
      <Button
        onClick={() => navigate("/user/profile/admin")}
        buttonText="Admin"
        className="profileSidebarButton"
      >
        <i className="fa-solid fa-wrench"></i>
      </Button>
    </div>
  );
}

export default ProfileSidebarContainer;
