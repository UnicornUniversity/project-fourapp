import RegisterCard from "../containers/auth/RegisterCard";

import NavBar from "../containers/header/NavBar";

function Register() {
  return (
    <div className="login">
      <header>
        <NavBar />
      </header>
      <main>
        <RegisterCard />
      </main>
      <footer></footer>
    </div>
  );
}

export default Register;
