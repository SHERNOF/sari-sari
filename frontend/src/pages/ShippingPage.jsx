import { Helmet } from "react-helmet-async";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import CheckoutSteps from "../components/CheckoutSteps";
import StyledH1 from "../ui/pageTitle/PageTitle";

export default function ShippingPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
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
      <CheckoutSteps step1 step2></CheckoutSteps>

      <StyledH1
        style={{ marginBottom: "3rem", textAlign: "left", width: "100%" }}
      >
        Shipping Address
      </StyledH1>

      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <FormControl
          style={{
            width: "40%",
          }}
        >
          <TextField
            sx={{ marginBottom: 3, marginTop: 3 }}
            id="outlined-search"
            label="Full Name"
            type="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Address"
            type="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="City"
            type="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Postal Code"
            type="input"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <TextField
            sx={{ marginBottom: 3 }}
            id="outlined-search"
            label="Country"
            type="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <div style={{ marginBottom: "3rem", marginTop: "-1rem" }}>
            <Button type="submit" variant="contained">
              Continue
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
}
