import "./App.css";
import UserProvider from "./providers/UserProvider";
import NavBar from "./components/header/NavBar";
import RegisterCard from "./components/login/RegisterCard";
import LoginCard from "./components/login/LoginCard";
import GoogleLogin from "./pages/google";
import UserProfile from "./pages/userProfile"; // Import komponenty profilu
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            {/* Domovská stránka */}
            <Route
              path="/"
              element={
                <>
                  <GoogleLogin />
                  <UserProvider>
                    <LoginCard />
                    <RegisterCard />
                  </UserProvider>
                </>
              }
            />

            {/* Profil uživatele */}
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
