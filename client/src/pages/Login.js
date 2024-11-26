import LoginCard from "../containers/auth/LoginCard";
import NavBar from "../containers/header/NavBar";

function Login() {
  return (
    <div className="login">
      <header>
        <NavBar />
      </header>
      <main>
        <LoginCard />
      </main>
      <footer></footer>
    </div>
  );
}

export default Login;
