import { Store } from "../store.js";

import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils.js";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, order: action.payload };
    default:
      return state;
  }
};

export default function OrderPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {},
  });

  const params = useParams();
  const { id: orderId } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, navigate, orderId]);
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox ariant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1>Order {orderId}</h1>
      <Grid container md={8}>
        <Grid item>
          <Card sx={{ marginBottom: "2rem" }} elevation={3}>
            <CardHeader title="Shipping" />
            <CardContent>
              <strong>Name : </strong> {order.shippingAddress.fullName}{" "}
              <br></br>
              <strong>Address : </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </CardContent>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Delivered</MessageBox>
            )}
            <CardContent>
              <Link to="/shipping">Edit</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Payment" />
            <CardContent>
              <strong>Name : </strong> {order.shippingAddress.fullName}{" "}
            </CardContent>
            {order.isPaid ? (
              <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </Card>
          <Card>
            <CardHeader title="Items" />
            <List>
              {order.orderItems.map((item) => (
                <ListItem key={item._id}>
                  <Grid container>
                    <Grid item md={6}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.desc}`}>{item.name}</Link>
                    </Grid>
                    <Grid item md={3}>
                      <span>{item.quantity}</span>
                    </Grid>
                    <Grid item md={3}>
                      <span>${item.price}</span>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid container md={4}>
          <Card>
            <CardHeader title="Order Summary" />
            <List>
              <ListItem>
                <Grid container>
                  <Grid item>Items</Grid>
                  <Grid item>${order.itemsPrice.toFixed(2)}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item>Shipping</Grid>
                  <Grid item>${order.shippingPrice.toFixed(2)}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item>Order Total</Grid>
                  <Grid item>${order.totalPrice.toFixed(2)}</Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
