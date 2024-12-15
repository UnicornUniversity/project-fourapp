/*

import "./../../assets/styles/header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";

function Navbar() {
  const { navbarCategories } = useContext(CategoryContext);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <div className="navbar">
      <div>
        <h3 onClick={() => navigate("/")}>Logo</h3>
      </div>
      <div>
        {navbarCategories ? (
          navbarCategories.map((category) =>
            category.parentCategoryId === null ? (
              <div onClick={() => navigate(`/${category.name}`)}>
                {category.name}
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
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
*/

import "./../../assets/styles/header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function NavbarContainer() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <div className="navbar">
      <div>
        <h3 onClick={() => navigate("/")}>Logo</h3>
      </div>
      <div>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
            <a href="#" onClick={() => navigate("/men")}>
              Link 1
            </a>
          </div>
        </div>
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

export default NavbarContainer;
