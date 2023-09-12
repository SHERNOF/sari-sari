import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import { Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { setSideBarIsOpen, Store } from "../store";
import Admin from "../components/Admin";
import Dropdown from "../components/Dropdown";

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

Header.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  // const [sideBarIsOpen, setSideBarIsOpen] = React.useState(false);
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { cart, userInfo, sideBarIsOpen } = state;
  return (
    <React.Fragment>
      <Header {...props}>
        <AppBar sx={{ background: "#404040" }}>
          {/* <Toolbar>{props.children}</Toolbar> */}
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
                // onClick={() => setSideBarIsOpen(true)}
                onClick={() => ctxDispatch(setSideBarIsOpen(true))}
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
        </AppBar>
      </Header>
      <Toolbar />
      <Container></Container>
    </React.Fragment>
  );
}
