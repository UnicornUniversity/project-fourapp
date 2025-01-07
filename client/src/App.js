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
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
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
                          <Route path="/shipping" element={<Shipping />} />
                          <Route path="/overview" element={<Overview />} />

                          {/* Profile routes */}
                          <Route
                            path="/user/profile/*"
                            element={<ProfileLayout />}
                          >
                            <Route index element={<ProfileOverview />} />
                            <Route path="update" element={<ProfileUpdate />} />
                            <Route path="orders" element={<ProfileOrders />} />
                            <Route
                              path="wishlist"
                              element={<ProfileWishlist />}
                            />
                            <Route
                              path="admin"
                              element={<ProfileAdminPanel />}
                            />
                            <Route
                              path="admin/category/create"
                              element={<CategoryCreate />}
                            />
                            <Route
                              path="admin/product/create"
                              element={<ProductCreate />}
                            />
                            <Route
                              path="admin/product/:id/update"
                              element={<ProductUpdate />}
                            />
                            <Route
                              path="admin/category/:id/update"
                              element={<CategoryUpdate />}
                            />
                          </Route>
                        </Routes>
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
