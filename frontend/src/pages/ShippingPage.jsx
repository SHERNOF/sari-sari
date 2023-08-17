import { Helmet } from "react-helmet-async";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Button from "../ui/button/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";

export default function ShippingPage() {
  //   const [fullname, setFullname] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [city, setCity] = useState("");
  //   const [postalCode, setPostalCode] = useState("");
  //   const [country, setCountry] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart: shippingAddress } = state;
  const [fullname, setFullname] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullname,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullname,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <h1 style={{ marginBottom: "3rem" }}>Shipping Address</h1>
      <Paper
        elevation={24}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <FormControl
          onSubmit={submitHandler}
          sx={{
            width: "90%",
          }}
        >
          <TextField
            sx={{ marginBottom: 3, marginTop: 3 }}
            id="outlined-search"
            label="Full Name"
            type="input"
            value={fullname}
            onChange={(e) => setFullname((e) => e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Address"
            type="input"
            value={address}
            onChange={(e) => setAddress((e) => e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="City"
            type="input"
            value={city}
            onChange={(e) => setCity((e) => e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Postal Code"
            type="input"
            value={postalCode}
            onChange={(e) => setPostalCode((e) => e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Country"
            type="input"
            value={country}
            onChange={(e) => setCountry((e) => e.target.value)}
            required
          />
          <div style={{ marginBottom: "3rem" }}>
            <Button variant="contained">Submit</Button>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
}
