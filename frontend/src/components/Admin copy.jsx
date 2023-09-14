import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { Avatar, Divider, Paper, Tooltip } from "@mui/material";
import { Store } from "../store";
import SearchBox from "./SearchBox";
// import Link from "@mui/material/Link";
import StyledLink from "../ui/links/StyledLink";

const ITEM_HEIGHT = 48;

export default function Admin() {
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;
  console.log(userInfo.name);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <div>
      <Tooltip title="Account info">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: ".8em" }}>
            {userInfo.name.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        // style={{ width: "15ch" }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem value={"Dashboard"}>
          <StyledLink to="/admin/dashboard" style={{ fontSize: ".7em" }}>
            Dashboard
          </StyledLink>
        </MenuItem>

        <StyledLink to="/admin/products" style={{ fontSize: ".7em" }}>
          <MenuItem value={"Products"}>Products</MenuItem>
        </StyledLink>
        <MenuItem value={"Order List"}>
          <StyledLink to="/admin/orders" style={{ fontSize: ".7em" }}>
            Order List
          </StyledLink>
        </MenuItem>
        <MenuItem value={"User List"}>
          <StyledLink style={{ fontSize: ".7em" }} to="/admin/users">
            Users
          </StyledLink>
        </MenuItem>
        <Divider></Divider>
        <MenuItem>
          <SearchBox></SearchBox>
        </MenuItem>
        <Divider></Divider>
        <MenuItem>
          <StyledLink style={{ fontSize: ".7em" }} to="/profile">
            User Profile
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink style={{ fontSize: ".7em" }} to="/orderhistory">
            Order History
          </StyledLink>
        </MenuItem>
        <Divider></Divider>

        <MenuItem>
          <StyledLink
            style={{ fontSize: ".7em" }}
            to="#signout"
            onClick={signOutHandler}
          >
            Sign Out
          </StyledLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
