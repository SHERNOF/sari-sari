import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext } from "react";
import Container from "@mui/material/Container";
import ProductPage from "./pages/ProductPage";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Store } from "./store";
import Stack from "@mui/material/Stack";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import Dropdown from "./ui/dropdown/Dropdwon";
import SnackBar from "./ui/snackbar/SnackBar";
import ShippingPage from "./pages/ShippingPage";
import SignUpPage from "./pages/SignUpPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  return (
    <BrowserRouter>
      <div className="app">
        <SnackBar />
        <header>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/">sari-sari</Link>
            </div>
            <div
              style={{
                marginLeft: "2rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {userInfo ? <Dropdown /> : <Link to="/signin">Sign In</Link>}
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
                      cart
                    </Badge>
                  </Stack>
                )}
              </Link>
            </div>
          </Container>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:desc" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/orderhistory" element={<OrderHistoryPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
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
