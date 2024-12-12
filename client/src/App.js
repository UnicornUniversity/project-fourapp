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
import CategoryCreate from "./pages/CategoryCreate";
import ProductCreate from "./pages/ProductCreate";
import Layout from "./pages/Layout";
import ProductUpdate from "./pages/ProductUpdate";
import CategoryUpdate from "./pages/CategoryUpdate";
import CategoryProvider from "./providers/CategoryProvider";
import Products from "./pages/Products";


function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <CategoryProvider>
          <ProductProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:categoryName" element={<Products/>}/>
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/profile" element={<ProfileOverview />} />
                <Route
                  path="/user/profile/update"
                  element={<ProfileUpdate />}
                />
                <Route
                  path="/user/profile/orders"
                  element={<ProfileOrderHistory />}
                />
                <Route path="/user/profile/admin" element={<ProfileAdmin />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route
                  path="/user/profile/admin/category/create"
                  element={<CategoryCreate />}
                />
                <Route
                  path="/user/profile/admin/product/create"
                  element={<ProductCreate />}
                />
                <Route
                  path="/user/profile/admin/product/update"
                  element={<ProductUpdate />}
                />
                <Route
                  path="/user/profile/admin/category/:id/update"
                  element={<CategoryUpdate />}
                />
              </Routes>
            </Layout>
          </ProductProvider>
        </CategoryProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;