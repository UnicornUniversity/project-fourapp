import "./../../assets/styles/header.css";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import Cookies from "js-cookie";
import Logo from "../../assets/images/fourapp-logo.png";
import { useState } from "react";

function NavbarContainer() {
  const token = Cookies.get("token");
  const { categoryAllTree } = useContext(CategoryContext);
  //console.log(categoryTree);
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open
  const location = useLocation(); // React Router hook to get the current URL

  const handleCategoryHover = (id) => {
    setOpenDropdown(id); // Open the corresponding dropdown
  };

  const handleNavbarLeave = () => {
    setOpenDropdown(null); // Close the dropdown when leaving the navbar
  };

  // Close the dropdown when the URL changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]); // Runs whenever the pathname changes

  return (
    <nav
      className="navbar"
      onMouseLeave={handleNavbarLeave} // Close dropdown when leaving navbar
    >
      <div className="navbarLogoContainer">
        <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
      </div>
      <ul className="menu">
        {categoryAllTree
          ? categoryAllTree.map((category) => (
              <li
                key={category._id}
                onMouseEnter={() => handleCategoryHover(category._id)} // Open dropdown on category hover
              >
                <a>{category.name}</a>
                <div
                  className={`dropdown ${
                    openDropdown === category._id ? "show" : ""
                  }`}
                >
                  <div className="dropdown-container">
                    {category.subcategories ? (
                      category.subcategories.map((subcategory) => (
                        <div className="column" key={subcategory._id}>
                          <h4>{subcategory.name}</h4>
                          {subcategory.subcategories.map((subcategory) => (
                            <a key={subcategory._id}>{subcategory.name}</a>
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
        <i className="fa-solid fa-magnifying-glass"></i>
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
