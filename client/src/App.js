import UserProvider from "./providers/UserProvider";
import Home from "./pages/HomePage";
import ProductProvider from "./providers/ProductProvider";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import Layout from "./pages/Layout";
import Layout from "./layouts/Layout";
import CategoryProvider from "./providers/CategoryProvider";
import ProfileLayout from "./layouts/ProfileLayout";

/*---AUTH---*/
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
/*-------------*/

/*---PRODUCT---*/
import ProductDetail from "./pages/product/DetailPage";
import ProductList from "./pages/product/ListPage";
/*-------------*/

/*---PROFILE---*/
import ProfileOverview from "./pages/profile/OverviewPage";
import ProfileOrders from "./pages/profile/OrdersPage";
import ProfileUpdate from "./pages/profile/UpdatePage";
/*-ADMIN-*/
import ProfileAdminPanel from "./pages/profile/admin/PanelPage";
import CategoryCreate from "./pages/profile/admin/category/CreatePage";
import ProductCreate from "./pages/profile/admin/product/CreatePage";
import CategoryUpdate from "./pages/profile/admin/category/UpdatePage";
import ProductUpdate from "./pages/profile/admin/product/UpdatePage";
/*-------*/
/*-------------*/

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
                  <Route path="/:categoryName" element={<ProductList />} />
                  <Route path="/user/login" element={<Login />} />

                  <Route path="/user/register" element={<Register />} />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                </Routes>

                <ProfileLayout>
                  <Routes>
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
                    <Route path="/user/profile" element={<ProfileOverview />} />
                    <Route
                      path="/user/profile/update"
                      element={<ProfileUpdate />}
                    />
                    <Route
                      path="/user/profile/orders"
                      element={<ProfileOrders />}
                    />
                    <Route
                      path="/user/profile/admin"
                      element={<ProfileAdminPanel />}
                    />
                  </Routes>
                </ProfileLayout>
              </Layout>
            </ProductProvider>
          </CategoryProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
