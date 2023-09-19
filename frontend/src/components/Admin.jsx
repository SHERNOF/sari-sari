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
        <StyledLink to="/admin/dashboard">
          <MenuItem sx={{fontSize:'.7rem'}} >
          Dashboard
        </MenuItem>
        </StyledLink>

        <StyledLink to="/admin/products">
        <MenuItem sx={{fontSize:'.7rem'}} value={"Products"}>
          Products
        </MenuItem>
        </StyledLink>

        <StyledLink to="/admin/orders">
          <MenuItem sx={{fontSize:'.7rem'}} value={"Order List"}>
          Order List
        </MenuItem>
        </StyledLink>

        <StyledLink to="/admin/users">
          <MenuItem sx={{fontSize:'.7rem'}} value={"User List"}>
          Users
        </MenuItem>
        </StyledLink>
        
        <Divider></Divider>

        <MenuItem  sx={{ display: { sm: "none" }, fontSize:'.7rem' }}>
          <SearchBox></SearchBox>
        </MenuItem>

        <Divider sx={{ display: { sm: "none" } }}></Divider>

        <StyledLink to="/profile"> <MenuItem sx={{fontSize:'.7rem'}}>
          User Profile
        </MenuItem>
        </StyledLink>

        <StyledLink to="/orderhistory">
          <MenuItem sx={{fontSize:'.7rem'}}>
         Order History
        </MenuItem>
        </StyledLink>

        <Divider></Divider>

          <StyledLink to="#signout" onClick={signOutHandler}>
            <MenuItem sx={{fontSize:'.7rem'}}>
                Sign Out
            </MenuItem>
          </StyledLink>
      </Menu>
    </div>
  );
}
