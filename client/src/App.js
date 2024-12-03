import UserProvider from "./providers/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileAdmin from "./pages/ProfileAdmin";
import ProfileOrderHistory from "./pages/ProfileOrderHistory";
import ProfileUpdate from "./pages/ProfileUpdate";
import Register from "./pages/Register";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Products } from "./pages/Products";
import { Layout } from "./pages/Layout";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/profile/edit" element={<Profile />} />
              <Route path="/user/profile/orders" element={<Profile />} />
              <Route path="/user/profile/admin" element={<Profile />} />
              <Route path="/user/register" element={<Register />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
