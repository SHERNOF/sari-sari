import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header.jsx";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Store, setSnackbar } from "./store";
import Stack from "@mui/material/Stack";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import Dropdown from "./components/Dropdown";
import SnackBar from "./ui/snackbar/SnackBar";
import ShippingPage from "./pages/ShippingPage";
import SignUpPage from "./pages/SignUpPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import axios from "axios";
import { getError } from "./utils";
import SearchBox from "./components/SearchBox";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin";
import AdminRoute from "./components/AdminRoute";
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import HideAppBar from "./components/Header.jsx";

// import {Root} from './utils.js'
// export const Root = styled("div")(({ theme }) => ({
//   padding: theme.spacing(1),
//   [theme.breakpoints.down("md")]: {
//     backgroundColor: red[500],
//   },
//   [theme.breakpoints.up("md")]: {
//     backgroundColor: blue[500],
//   },
//   [theme.breakpoints.up("lg")]: {
//     backgroundColor: green[500],
//   },
// }));



// export const themeOptions = {
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#3949ab",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//   },
// };

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [categories, setCategories] = useState([]);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        ctxDispatch(setSnackbar(true, "error", getError(err)));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sideBarIsOpen ? "site-container active-cont" : "site-container"
        }
      >
        <SnackBar />
        <HideAppBar></HideAppBar>
        {/* <header>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                aria-label="open drawer"
                onClick={() => setSideBarIsOpen(true)}
                edge="end"
                sx={{
                  marginRight: 1,
                  ...(sideBarIsOpen && { display: "none" }),
                }}
              >
                <MenuIcon className="custom-icon" style={{ color: "white" }} />
              </IconButton>
              <Link to="/">
                <h1 className="store">sari-sari</h1>
              </Link>
              <SearchBox onChange={(e) => e.target.value}></SearchBox>
            </div>
            <div
              style={{
                marginLeft: "2rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/cart" style={{ marginLeft: "2rem" }}>
                {cart.cartItems.length > 0 && (
                  <Stack>
                    <Badge
                      badgeContent={cart.cartItems.reduce(
                        (a, c) => a + c.quantity,
                        0
                      )}
                      color="primary"
                    >
                      <ShoppingCartIcon
                        sx={{ color: "white" }}
                      ></ShoppingCartIcon>
                    </Badge>
                  </Stack>
                )}
              </Link>
              {userInfo && userInfo.isAdmin && <Admin />}
              {userInfo ? <Dropdown /> : <Link to="/signin">Sign In</Link>}
            </div>
          </Container>
        </header> */}
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          open={sideBarIsOpen}
        >
          <div
            onClick={() => setSideBarIsOpen(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <strong>Categories</strong>
            <ChevronLeftIcon className="custom-icons" />
          </div>
          <Divider></Divider>
          <List>
            {categories.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton>
                  <Link
                    to={`/search?category=${category}`}
                    onClick={() => setSideBarIsOpen(false)}
                  ></Link>
                  <ListItemText primary={category}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:desc" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              {/* admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditPage />
                  </AdminRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            border: "1px solid red",
          }}
        >
          SHERNOF
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
