import { Box, CardHeader, Grid } from "@mui/material";
import CheckoutSteps from "../components/CheckoutSteps";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useContext, useEffect, useReducer } from "react";
import { Store, setSnackbar } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from '../components/Loading'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from '@mui/material/Button';
import axios from 'axios'
import { getError } from "../utils";


const reducer = (state, action) =>{
    switch(action.type){
        case 'CREATE_REQUEST':
        return { ...state, loading: true};
        case 'CREATE_SUCCESS':
        return { ...state, loading: false};
        case 'CREATE_FAIL':
        return { ...state, loading: false};
        default:
        return state
    }
}

export default function PlaceOrderPage() {
    const navigate = useNavigate()
    const [{ loading}, dispatch] = useReducer(reducer, {
        loading: false,
    }) 
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  cart.taxPrice = round2(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
      try{
        
        dispatch({ type: 'CREATE_REQUEST' })
        const { data } = await axios.post('/api/orders',{
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }, 
        {
            headers:{
                authorization: `Bearer ${userInfo.token}`,
            },
        });
        ctxDispatch({ type: 'CART_CLEAR' });
        dispatch({ type: 'CREATE_SUCCESS '});
        ctxDispatch(setSnackbar(true, "success", 'Thank you... Order Created' ))
        localStorage.removeItem('cartItems')
        navigate(`/order/${data.order._id}`)

    }catch (err) {
        dispatch({ type: 'CREATE_FAIL' })
        ctxDispatch(setSnackbar(true, "error", getError(err) ))
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  return (
    <Box>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 style={{ marginBottom: "1rem" }}>Preview Order</h1>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Card sx={{ marginBottom: "2rem" }} elevation={3}>
            <CardHeader title="Shipping" />
            <CardContent>
              <strong>Name : </strong> {cart.shippingAddress.fullName} <br></br>
              <strong>Address : </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </CardContent>
            <CardContent>
              <Link to="/shipping">Edit</Link>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: "2rem" }} elevation={3}>
            <CardHeader title="Payment" />
            <CardContent>
              <strong>Method : </strong> {cart.paymentMethod}
            </CardContent>
            <CardContent>
              <Link to="/payment">Edit</Link>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: "2rem" }} elevation={3}>
            <CardHeader title="Items" />
            <List>
              {cart.cartItems.map((item) => (
                <ListItem key={item._id}>
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link
                        style={{ marginLeft: "2rem" }}
                        to={`/product/${item.desc}`}
                      >
                        {item.name}
                      </Link>
                    </Grid>
                    <Grid
                      item
                      md={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>{item.quantity}</span>
                    </Grid>
                    <Grid
                      item
                      md={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>${item.price}</span>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
              <CardContent>
                <Link to="/cart">Edit</Link>
              </CardContent>
            </List>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Paper sx={{ width: "100%" }} elevation={3}>
            {/* <Grid item> */}
            <List>
              <CardHeader title="Order Summary" />
              <ListItem>
                <Grid container>
                  <Grid  item md={6}>
                    Items :{" "}
                  </Grid>
                  <Grid item md={6}>
                    ${cart.itemsPrice.toFixed(2)}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem>
                <Grid container>
                  <Grid item md={6}>
                    Shipping :{" "}
                  </Grid>
                  <Grid item md={6}>
                    ${cart.shippingPrice.toFixed(2)}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem>
                <Grid container>
                  <Grid item md={6}>
                    Tax :{" "}
                  </Grid>
                  <Grid item md={6}>
                    {" "}
                    ${cart.taxPrice.toFixed(2)}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem>
                <Grid container>
                  <Grid item md={6}>
                    <strong>Order Total : </strong>
                  </Grid>
                  <Grid item md={6}>
                    ${cart.totalPrice.toFixed(2)}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem>
                <div style={{ display: "grid", width: "100%" }}>
                  <Button
                    // type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                    variant="contained"
                  >
                    Place Order
                  </Button>
                </div>
                { loading && <Loading />}
              </ListItem>
            </List>
            {/* </Grid> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
