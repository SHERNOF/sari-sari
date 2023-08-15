import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import ProductPage from "./pages/ProductPage";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Store } from "./store";
import Stack from "@mui/material/Stack";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import Dropdown from "./ui/dropdown/Dropdwon";
import Snackbar from "@mui/material/Snackbar";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, open } = state;

  const handleClose = (event, reason) => {
    ctxDispatch({ type: "TOAST_CLOSE" });
  };

  return (
    <BrowserRouter>
      <div className="app">
        {open && (
          <div>
            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Testing 123"
            />
          </div>
        )}

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
