import "./../../assets/styles/header.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="navBar">
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
          onClick={() => navigate("/user/login")}
        ></i>
        <i className="fa-solid fa-bag-shopping"></i>
      </div>
    </div>
  );
}

export default App;
