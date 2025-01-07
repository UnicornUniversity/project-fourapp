import "./../../assets/styles/header.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import Cookies from "js-cookie";
import Logo from "../../assets/images/fourapp-logo.png";

function NavbarContainer() {
  const token = Cookies.get("token");
  const { categoryAllTree } = useContext(CategoryContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the mobile menu

  const handleCategoryHover = (id) => {
    setOpenDropdown(id);
  };

  const handleNavbarLeave = () => {
    setOpenDropdown(null);
  };

  const handleNavigate = (category) => {
    navigate(`/product/list/${category._id}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setOpenDropdown(null);
    setMenuOpen(false); // Close the menu when navigating
  }, [location.pathname]);

  return (
    <nav className="navbar" onMouseLeave={handleNavbarLeave}>
      <div className="navbarBarContainer" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="navbarLogoContainer">
        <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
      </div>
      <ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
        {categoryAllTree
          ? categoryAllTree.map((category) => (
              <li
                key={category._id}
                onMouseEnter={() => handleCategoryHover(category._id)}
              >
                <a onClick={() => handleNavigate(category)}>{category.name}</a>
                <div
                  className={`dropdown ${
                    openDropdown === category._id ? "show" : ""
                  }`}
                >
                  <div className="dropdown-container">
                    {category.subcategories ? (
                      category.subcategories.map((subcategory) => (
                        <div className="column" key={subcategory._id}>
                          <h4 onClick={() => handleNavigate(subcategory)}>
                            {subcategory.name}
                          </h4>
                          {subcategory.subcategories.map((sub) => (
                            <a onClick={() => handleNavigate(sub)} key={sub._id}>
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
      <div className="navbarIconContainer">
        <i
          className="fa-solid fa-user"
          onClick={() => navigate(token ? "/user/profile" : "/user/login")}
        ></i>
        <i
          className="fa-solid fa-bag-shopping"
          onClick={() => navigate(token ? "/user/cart" : "/user/login")}
        ></i>
      </div>
    </nav>
  );
}

export default NavbarContainer;