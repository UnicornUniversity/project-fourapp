import "./../../assets/styles/header.css";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import Cookies from "js-cookie";
import Logo from "../../assets/images/fourapp-logo.png";
import { useState } from "react";

function NavbarContainer() {
  const token = Cookies.get("token");
  const { categoryTree } = useContext(CategoryContext);
  //console.log(categoryTree);
  const navigate = useNavigate();

  const c = [
    {
      _id: "675f4db6e94fa1370cbe9e99",
      name: "Everyone",
      parentCategoryId: null,
      __v: 0,
      subCategories: [
        {
          _id: "675f4e0fe94fa1370cbe9ea1",
          name: "Tops",
          parentCategoryId: "675f4db6e94fa1370cbe9e99",
          __v: 0,
          subCategories: [
            {
              _id: "675f4e0fe94fa1377cbe9ea1",
              name: "Shirts",
              parentCategoryId: "675f4e0fe94fa1370cbe9ea1",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "675f4e0fe94fa1370cbe5ea1",
              name: "Hoodies",
              parentCategoryId: "675f4e0fe94fa1370cbe9ea1",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "675f4e0fe94fa1370cbe9eq1",
              name: "Sweaters",
              parentCategoryId: "675f4e0fe94fa1370cbe9ea1",
              __v: 0,
              subCategories: [],
            },
          ],
        },
        {
          _id: "675f4e14e94fa1370cbe9ea3",
          name: "Bottoms",
          parentCategoryId: "675f4db6e94fa1370cbe9e99",
          __v: 0,
          subCategories: [
            {
              _id: "675f4e0fe94fa1377cbe9ea1",
              name: "Pants",
              parentCategoryId: "675f4e14e94fa1370cbe9ea3",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "675f4e0fe54fa1370cbe5ea1",
              name: "Trousers",
              parentCategoryId: "675f4a4e94fa1370cbe9ea3",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "675f4e0fe94fa1370cbe9eq1",
              name: "BOMBA",
              parentCategoryId: "675f4b14e94fa1370cbe9ea3",
              __v: 0,
              subCategories: [],
            },
          ],
        },
        {
          _id: "675f4e1ce94fa1370cbe9ea5",
          name: "Accessories",
          parentCategoryId: "675f4db6e94fa1370cbe9e99",
          __v: 0,
          subCategories: [
            {
              _id: "666f4e0fe94fa1377cbe9ea1",
              name: "Rings",
              parentCategoryId: "675f4e14e94fa1370cbe9ea3",
              __v: 0,
              subCategories: [],
            },
          ],
        },
      ],
    },
    {
      _id: "1",
      name: "Men",
      parentCategoryId: null,
      __v: 0,
      subCategories: [
        {
          _id: "2",
          name: "Tops",
          parentCategoryId: "1",
          __v: 0,
          subCategories: [
            {
              _id: "3",
              name: "Shirts",
              parentCategoryId: "2",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "4",
              name: "Hoodies",
              parentCategoryId: "2",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "5",
              name: "HIHIHI",
              parentCategoryId: "2",
              __v: 0,
              subCategories: [],
            },
          ],
        },
        {
          _id: "6",
          name: "Bottoms",
          parentCategoryId: "1",
          __v: 0,
          subCategories: [
            {
              _id: "7",
              name: "Pants",
              parentCategoryId: "6",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "8",
              name: "Trousers",
              parentCategoryId: "6",
              __v: 0,
              subCategories: [],
            },
            {
              _id: "9",
              name: "BOMBA",
              parentCategoryId: "6",
              __v: 0,
              subCategories: [],
            },
          ],
        },
        {
          _id: "10",
          name: "Accessories",
          parentCategoryId: "1",
          __v: 0,
          subCategories: [
            {
              _id: "11",
              name: "Rings",
              parentCategoryId: "10",
              __v: 0,
              subCategories: [],
            },
          ],
        },
      ],
    },
  ];

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
        {c
          ? c.map((category) => (
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
                    {category.subCategories.map((subCategory) => (
                      <div className="column" key={subCategory._id}>
                        <h4>{subCategory.name}</h4>
                        {subCategory.subCategories.map((subSubCategory) => (
                          <a key={subSubCategory._id}>{subSubCategory.name}</a>
                        ))}
                      </div>
                    ))}
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
