import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { Store } from "../../store";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Dropdown(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem('shippingAddress')
  };
  return (
    <Box
      sx={{
        minWidth: 200,
        marginLeft: "2rem",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          {userInfo.name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // label={userInfo.name}
        >
          <Link to="/profile">
            <MenuItem>User Profile</MenuItem>
          </Link>
          <Link to="/orderhistory">
            <MenuItem>Order History</MenuItem>
          </Link>
          <Divider></Divider>
          <Link
            to="/#signout"
            onClick={signOutHandler}
            style={{ fontSize: "2px" }}
          >
            <MenuItem>Sign Out</MenuItem>
          </Link>
        </Select>
      </FormControl>
    </Box>
  );
}
