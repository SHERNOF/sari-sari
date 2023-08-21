import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [ paymentMethodName, setPaymentMethod  ]= useState(
    paymentMethod || "Paypal"
  );
 
  
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 style={{ marginTop: "3rem" }}>Payment Method</h1>
        <form onSubmit={submitHandler}>
        <FormControl component="fieldset">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Paypal"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Paypal"
                control={<Radio />}
                label="Paypal"
                checked={paymentMethodName === "Paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FormControlLabel
                value="Stripe"
                control={<Radio />}
                label="Stripe"
                checked={paymentMethodName === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{marginBottom:'1rem'}}
              />
            </RadioGroup>
            <Button variant="contained" type="submit">
              Continue
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}