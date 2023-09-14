import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header.jsx";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Store, setSnackbar, setSideBarIsOpen } from "./store";
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
import { IconButton, SpeedDial, ThemeProvider } from "@mui/material";
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
import SDial from "./components/Sdial";
import { styled } from "@mui/material/styles";
import { blue, green, red } from "@mui/material/colors";
import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
  },
});

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sideBarIsOpen } = state;
  const [categories, setCategories] = useState([]);

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
  console.log(typeof setSideBarIsOpen);

  return (
    <BrowserRouter>

      <ThemeProvider  theme={theme}>
      <div
        className={
          sideBarIsOpen ? "site-container active-cont" : "site-container"
        }
      >
        <SnackBar />
        <HideAppBar></HideAppBar>
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
            // onClick={() => setSideBarIsOpen(false)}
            onClick={() => ctxDispatch(setSideBarIsOpen(false))}
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
                    // onClick={() => setSideBarIsOpen(false)}
                    onClick={() => ctxDispatch(setSideBarIsOpen(false))}
                  ></Link>
                  <ListItemText primary={category}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <SDial></SDial>
        <div />
        <main style={{ marginTop: "2rem" }}>
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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
