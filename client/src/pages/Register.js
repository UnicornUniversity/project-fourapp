import RegisterCard from "../containers/auth/RegisterCard";

import NavBar from "../containers/header/Navbar";

function Register() {
  return (
    <div className="register">
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
