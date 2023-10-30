import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import { Badge, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { setSideBarIsOpen, Store } from "../store";
import Admin from "../components/Admin";
import Dropdown from "./Dropdown";
import StyledLink from "../ui/links/StyledLink";

function Header(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props) {
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { cart, userInfo, sideBarIsOpen } = state;
  console.log(userInfo);
  return (
    <React.Fragment>
      <Header {...props} sx={{ top: "0" }}>
        <AppBar>
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
                onClick={() => ctxDispatch(setSideBarIsOpen(true))}
                edge="end"
                sx={{
                  marginRight: 2,
                  ...(sideBarIsOpen && { display: "none" }),
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
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
                      sx={{ marginRight: { md: "1rem", sm: "-1rem" } }}
                    >
                      <ShoppingCartIcon
                        sx={{ color: "white" }}
                      ></ShoppingCartIcon>
                    </Badge>
                  </Stack>
                )}
              </Link>

              {userInfo ? (
                <Dropdown />
              ) : (
                <Link to="/signin" style={{ color: "white" }}>
                  Sign In
                </Link>
              )}

              {userInfo && userInfo.isSeller ? (
                <div className="dropdown">
                  <Link to="#admin">
                    <span style={{ color: "black" }}>Seller</span>{" "}
                    <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
              {userInfo && userInfo.isAdmin && <Admin />}
            </div>
          </Container>
        </AppBar>
      </Header>
    </React.Fragment>
  );
}
