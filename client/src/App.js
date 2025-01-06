import UserProvider from "./providers/UserProvider";
import Home from "./pages/HomePage";
import ProductProvider from "./providers/ProductProvider";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import Layout from "./pages/Layout";
import Layout from "./layouts/Layout";
import CategoryProvider from "./providers/CategoryProvider";
import ProfileLayout from "./layouts/ProfileLayout";
import CartProvider from "./providers/CartProvider";
import OrderProvider from "./providers/OrderProvider";
import OrdersProvider from "./providers/OrdersProvider";
import WishlistProvider from "./providers/WishlistProvider";

/*---AUTH---*/
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
/*-------------*/

/*---PRODUCT---*/
import ProductDetail from "./pages/product/DetailPage";
import ProductList from "./pages/product/ListPage";
/*-------------*/

/*---CART---*/
import Cart from "./pages/cart/CartPage";
/*-------------*/

/*---PROFILE---*/
import ProfileOverview from "./pages/profile/OverviewPage";
import ProfileOrders from "./pages/profile/OrdersPage";
import ProfileUpdate from "./pages/profile/UpdatePage";
import ProfileWishlist from "./pages/profile/WishlistPage";

/*-ADMIN-*/
import ProfileAdminPanel from "./pages/profile/admin/PanelPage";
import CategoryCreate from "./pages/profile/admin/category/CreatePage";
import ProductCreate from "./pages/profile/admin/product/CreatePage";
import CategoryUpdate from "./pages/profile/admin/category/UpdatePage";
import ProductUpdate from "./pages/profile/admin/product/UpdatePage";
import { Shipping } from "./pages/order/Shipping";
import { Overview } from "./pages/order/Overview";
/*-------*/
/*-------------*/

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <CategoryProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <OrdersProvider>
                  <WishlistProvider>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                          path="/product/list/:categoryId"
                          element={<ProductList />}
                        />
                        <Route path="/user/login" element={<Login />} />
                  <Route path="/user/register" element={<Register />} />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                  <Route path="/user/cart" element={<Cart />} />
                  <Route path="/Shipping" element={<Shipping/>} />
                  <Route path="/Overview" element={<Overview />} />
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
                            path="/user/profile/admin/product/:id/update"
                            element={<ProductUpdate />}
                          />
                          <Route
                            path="/user/profile/admin/category/:id/update"
                            element={<CategoryUpdate />}
                          />
                          <Route
                            path="/user/profile"
                            element={<ProfileOverview />}
                          />
                          <Route
                            path="/user/profile/update"
                            element={<ProfileUpdate />}
                          />
                          <Route
                            path="/user/profile/orders"
                            element={<ProfileOrders />}
                          />
                          <Route
                            path="/user/profile/wishlist"
                            element={<ProfileWishlist />}
                          />
                          <Route
                            path="/user/profile/admin"
                            element={<ProfileAdminPanel />}
                          />
                        </Routes>
                      </ProfileLayout>
                    </Layout>
                  </WishlistProvider>
                  </OrdersProvider>
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </CategoryProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
