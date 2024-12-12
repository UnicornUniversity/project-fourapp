import "./../../assets/styles/header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";

function Navbar() {
  const {navbarCategories} = useContext(CategoryContext)
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log(token)

  return (
    <div className="navbar">
      <div>
        <h3 onClick={() => navigate("/")}>Logo</h3>
      </div>
      <div>
        {navbarCategories ? navbarCategories.map((category) =>(
          <div onClick={() => navigate(`/${category.name}`)}>{category.name}</div>
        )
        ): <></>}
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
