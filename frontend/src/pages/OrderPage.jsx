import { setSnackbar, Store } from "../store.js";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils.js";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, order: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
};

export default function OrderPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, order, loadingPay, successPay }, dispatch] =
    useReducer(reducer, {
      successPay: false,
      loadingPay: false,
      loading: true,
      error: "",
      order: {},
    });

  const params = useParams();
  const { id: orderId } = params;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        ctxDispatch(setSnackbar(true, "success", "Order is Paid"));
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        ctxDispatch(setSnackbar(true, "error", getError(err)));
      }
    });
  };
  const onError = (err) => {
    ctxDispatch(setSnackbar(true, "error", getError(err)));
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, navigate, orderId, paypalDispatch, successPay]);
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 style={{ marginBottom: "3rem" }}>Order {orderId}</h1>
      {/* <Grid container md={8}> */}
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Card sx={{ marginBottom: "2rem" }} elevation={3}>
            <CardHeader title="Shipping" />
            <CardContent>
              <strong>Name : </strong> {order.shippingAddress.fullName}{" "}
              <br></br>
              <strong>Address : </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country},{" "}
              {order.isDelivered ? (
                <MessageBox severity="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox severity="error">Not Delivered</MessageBox>
              )}
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ marginBottom: "2rem" }}>
            <CardHeader title="Payment" />
            <CardContent>
              <strong>Name : </strong> {order.shippingAddress.fullName}{" "}
              {order.isPaid ? (
                <MessageBox seveity="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox severity="error">Not Paid</MessageBox>
              )}
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ marginBottom: "2rem" }}>
            <CardHeader title="Items" />
            <List>
              {order.orderItems.map((item) => (
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
        <Grid item md={4} xs={12} sm={12} sx={{ marginBottom: "2rem" }}>
          <Card elevation={7}>
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

              {!order.isPaid && (
                <ListItem>
                  {isPending ? (
                    <Loading />
                  ) : (
                    <div style={{ width: "100%" }}>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <Loading />}
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
