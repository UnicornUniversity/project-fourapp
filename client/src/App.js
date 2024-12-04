import UserProvider from "./providers/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileAdmin from "./pages/ProfileAdmin";
import ProfileOrderHistory from "./pages/ProfileOrderHistory";
import ProfileUpdate from "./pages/ProfileUpdate";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductProvider from "./providers/ProductProvider";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/profile" element={<ProfileOverview />} />
              <Route path="/user/profile/update" element={<ProfileUpdate />} />
              <Route
                path="/user/profile/orders"
                element={<ProfileOrderHistory />}
              />
              <Route path="/user/profile/admin" element={<ProfileAdmin />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/product/:productId" element={<Product />} />
            </Routes>
          </Layout>
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;