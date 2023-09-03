import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProductPage from "./pages/ProductPage";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Store, setSnackbar } from "./store";
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
import ProfilePage from "./pages/ProfilePage";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
        <header>
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
                <MenuIcon
                  className="custom-icon"
                  style={{ color: "white", marginLeft: "1rem" }}
                />
              </IconButton>
              <Link style={{ marginRight: "1rem" }} to="/">
                sari-sari
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
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
