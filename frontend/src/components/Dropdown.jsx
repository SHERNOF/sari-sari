import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Tooltip } from "@mui/material";
import { Store } from "../store";
import StyledLink from "../ui/links/StyledLink";
import { Link } from "react-router-dom";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <StyledLink style={{ fontSize: ".7em" }} to="/profile">
          <MenuItem>User Profile</MenuItem>
        </StyledLink>
        <StyledLink style={{ fontSize: ".7em" }} to="/orderhistory">
          <MenuItem>Order History</MenuItem>
        </StyledLink>
        <Divider></Divider>
        <StyledLink style={{ fontSize: ".7em" }} to="#signout">
          <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
        </StyledLink>
        <MenuItem>{userInfo.name}</MenuItem>
      </Menu>
    </div>
  );
}
