import "./../../assets/styles/header.css";
import { useContext, useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the side menu
  const [activeCategory, setActiveCategory] = useState(null); // Tracks which category is active
  const menuRef = useRef(null); // Ref for the menu container

  const handleNavigate = (category) => {
    navigate(`/product/list/${category._id}`);
    setMenuOpen(false); // Close the menu after navigation
  };

  const handleCategoryClick = (category) => {
    if (activeCategory === category._id) {
      setActiveCategory(null); // Close the subcategories if already active
    } else {
      setActiveCategory(category._id); // Set the active category
    }
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setActiveCategory(null); // Reset active category when navigating
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbarBarContainer" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="navbarLogoContainer">
        <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
      </div>
      <ul className={`menu ${menuOpen ? "menu-open" : ""}`} ref={menuRef}>
      <i class="fa-solid fa-x closeMark" onClick={() => setMenuOpen(false)}></i>
        {categoryAllTree &&
          categoryAllTree.map((category) => (
            <li key={category._id}>
              <a onClick={() => handleCategoryClick(category)}>
                {category.name}
              </a>
              {activeCategory === category._id && category.subcategories && (
                <div className="subcategories">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory._id}>
                      <h4 onClick={() => handleNavigate(subcategory)}>
                        {subcategory.name}
                      </h4>
                      {subcategory.subcategories &&
                        subcategory.subcategories.map((sub) => (
                          <a
                            key={sub._id}
                            onClick={() => handleNavigate(sub)}
                          >
                            {sub.name}
                          </a>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
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
