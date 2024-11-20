import "./App.css";
import UserProvider from "./providers/UserProvider";
import NavBar from "./components/header/NavBar";
import RegisterCard from "./components/login/RegisterCard";
import LoginCard from "./components/login/LoginCard";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <UserProvider>
          <LoginCard />
          <RegisterCard />
        </UserProvider>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
