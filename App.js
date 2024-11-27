import "./App.css";
import UserProvider from "./providers/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/edit" element={<Profile />} />
            <Route path="/user/profile/orders" element={<Profile />} />
            <Route path="/user/profile/admin" element={<Profile />} />
            <Route path="/user/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;