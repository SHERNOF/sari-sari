import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { Avatar, Divider, Paper, Tooltip } from "@mui/material";
import { Store } from "../store";
import SearchBox from "./SearchBox";
import StyledLink from "../ui/links/StyledLink";

const ITEM_HEIGHT = 48;

export default function Admin() {
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;
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
          sx={{ marginLeft: { sm: "0" }, ml: 1 }}
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
        PaperProps={{
          sx: {
            maxHeight: { md: ITEM_HEIGHT * 7.5, xs: ITEM_HEIGHT * 7.5 },
            width: "30ch",
          },
        }}
      >
        <MenuItem value={"Dashboard"}>
          <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
        </MenuItem>

        <MenuItem value={"Products"}>
          <StyledLink to="/admin/products">Products</StyledLink>
        </MenuItem>

        <MenuItem value={"Order List"}>
          <StyledLink to="/admin/orders">Order List</StyledLink>
        </MenuItem>
        <MenuItem value={"User List"}>
          <StyledLink to="/admin/users">Users</StyledLink>
        </MenuItem>
        <Divider></Divider>
        <MenuItem sx={{ display: { sm: "none" } }}>
          <SearchBox></SearchBox>
        </MenuItem>
        <Divider sx={{ display: { sm: "none" } }}></Divider>
        <MenuItem>
          <StyledLink to="/profile">User Profile</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/orderhistory">Order History</StyledLink>
        </MenuItem>
        <Divider></Divider>

        <MenuItem>
          <StyledLink to="#signout" onClick={signOutHandler}>
            Sign Out
          </StyledLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
