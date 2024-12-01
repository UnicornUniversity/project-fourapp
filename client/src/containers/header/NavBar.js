import "./../../assets/styles/header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <div className="navbar">
      <div>
        <h3 onClick={() => navigate("/")}>Logo</h3>
      </div>
      <div>
        <p>Category</p>
        <p>Category</p>
        <p>Category</p>
        <p>Category</p>
      </div>
      <div>
        <i className="fa-solid fa-magnifying-glass"></i>
        <i
          className="fa-solid fa-user"
          onClick={() => navigate(token ? "/user/profile" : "/user/login")}
        ></i>
        <i className="fa-solid fa-bag-shopping"></i>
      </div>
    </div>
  );
}

export default Navbar;
