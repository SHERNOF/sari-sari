import { CardHeader, Grid } from "@mui/material";
import CheckoutSteps from "../components/CheckoutSteps";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useContext } from "react";
import { Store } from "../store";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PlaceOrderPage(){
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart, useerInfo } = state
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1 style={{marginBottom: '1rem'}}>Preview Order</h1>
            <Grid container>
                <Grid item md={8}>
                    <Card>
                        <CardHeader 
                        title="Shipping"
                        />
                        <CardContent>
                            <strong>Name: </strong> {cart.shippingAddress.fullName} <br></br>
                            <strong>Address: </strong> 
                            {cart.shippingAddress.address},{' '}
                            {cart.shippingAddress.city},{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </CardContent>
                        <CardContent>
                        <Link to='/shipping'>Edit</Link>
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}