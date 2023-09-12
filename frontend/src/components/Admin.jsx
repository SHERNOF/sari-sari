import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Avatar, Tooltip } from "@mui/material";
import { Store } from "../store";

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

  return (
    <div>
      {/* <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        aria-label="account of current user"
        sx={{ color: "white" }}
      >
        <AccountCircle />
      </IconButton> */}
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
        style={{ width: "15ch" }}
      >
        <MenuItem value={"Dashboard"}>
          <Link to="/admin/dashboard" style={{ fontSize: ".7em" }}>
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem value={"Products"}>
          <Link to="/admin/products" style={{ fontSize: ".7em" }}>
            Products
          </Link>
        </MenuItem>
        <MenuItem value={"Order List"}>
          <Link to="/admin/orders" style={{ fontSize: ".7em" }}>
            Order List
          </Link>
        </MenuItem>
        <MenuItem value={"User List"}>
          <Link style={{ fontSize: ".7em" }} to="/admin/users">
            Users
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
