import LoginCard from "../containers/login/LoginCard";
import Google from "../components/login/Google";
import NavBar from "../containers/header/NavBar";

function Login() {
  return (
    <div className="login">
      <header>
        <NavBar />
      </header>
      <main>
        <LoginCard />
        <Google />
      </main>

      <footer></footer>
    </div>
  );
}

export default Login;
