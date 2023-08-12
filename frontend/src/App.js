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

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <Container style={{ display: "flex" }}>
            <Link to="/">sari-sari</Link>
            <div style={{ marginLeft: "2rem" }}>
              <Link to="/cart">
                {cart.cartItems.length > 0 && (
                  <Stack>
                    {/* <Badge badgeContent={cart.cartItems.length} color="secondary">cart</Badge> */}

                    <Badge
                      badgeContent={cart.cartItems.reduce(
                        (a, c) => a + c.quantity,
                        0
                      )}
                      color="secondary"
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
