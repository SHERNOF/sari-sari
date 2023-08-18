import { Grid, Paper } from "@mui/material";

export default function CheckoutSteps(props){
    return <Grid  container className="checkout-steps">
        <Grid item md={3} className={props.step1 ? 'active' : ''}><Paper>Sign-IN</Paper></Grid>
        <Grid item md={3} className={props.step2 ? 'active' : ''}><Paper>Shipping</Paper></Grid>
        <Grid item md={3} className={props.step3 ? 'active' : ''}><Paper>Payment</Paper></Grid>
        <Grid item md={3} className={props.step4 ? 'active' : ''}><Paper>Place Order</Paper></Grid>
    </Grid>

}