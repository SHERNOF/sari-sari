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

import { Card, ThemeProvider } from "@mui/material";

import axios from "axios";
import { getError } from "./utils";

import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import HideAppBar from "./components/Header.jsx";
import SDial from "./components/Sdial";

import { createTheme } from "@mui/material/styles";
import MyDrawer from "./components/Drawer";

function App() {
  const { state } = useContext(Store);
  const { sideBarIsOpen } = state;

  const [evening, setEvening] = useState();
  useEffect(() => {
    let hr = new Date().getHours();
    const getTime = (hr) => {
      if (hr <= 18 || hr > 6) {
        setEvening(true);
      }
    };
    getTime();
  }, [evening]);
  console.log(evening);
  const theme = createTheme({
    palette: {
      mode: `${evening ? "dark" : "light"}`,
      primary: {
        main: "#f55e0d",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box
          style={{ minHeight: "100vh" }}
          className={
            sideBarIsOpen ? "site-container active-cont" : "site-container"
          }
        >
          <SnackBar />
          <MyDrawer />
          {/* <SDial></SDial> */}
          <Box />
          <HideAppBar></HideAppBar>
          <Card>
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
          </Card>
          <Box className="footer">SHERNOF</Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
