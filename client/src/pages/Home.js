import { useNavigate } from "react-router-dom";
import NavBar from "../containers/header/NavBar";

function App() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>
        <div onClick={() => navigate("user/login")}>Login</div>
        <div onClick={() => navigate("user/register")}>Register</div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
