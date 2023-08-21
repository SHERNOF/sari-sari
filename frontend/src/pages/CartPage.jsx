import { Button, Card, Divider, List, ListItem, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../store";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const navigate = useNavigate();

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const updateHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Product not found...");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  // const checkOutHandler = () => {
  //   if (shippingAddress && paymentMethod) {
  //     // navigate("/signin?redirect=/shipping");
  //     navigate("/signin?redirect=/placeorder");
  //   } else if (!shippingAddress) {
  //     navigate("/signin?redirect=/shipping");
  //   } else if (!paymentMethod) {
  //     navigate("/signin?redirect=/payment");
  //   }
  // };
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Grid container spacing={2}>
        <Grid item md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty
              <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <List>
              <Paper elevation={3} style={{ padding: ".2rem 0rem" }}>
                {cartItems.map((item) => (
                  <ListItem key={item._id}>
                    <Grid container>
                      <Grid
                        item
                        md={4}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Card>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            style={{ maxHeight: "60px" }}
                          />
                        </Card>
                        {""}
                        <Link
                          to={`/product/${item.desc}`}
                          style={{ marginLeft: "1rem" }}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          disabled={item.quantity === 1}
                          onClick={() => updateHandler(item, item.quantity - 1)}
                        >
                          <RemoveCircleOutlineOutlinedIcon
                            sx={{ color: "black" }}
                          />
                        </Button>
                        <span>{item.quantity}</span>
                        {""}
                        <Button
                          disabled={item.quantity === item.countInStock}
                          onClick={() => updateHandler(item, item.quantity + 1)}
                        >
                          <AddCircleOutlineOutlinedIcon
                            sx={{ color: "black" }}
                          />
                        </Button>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        ${item.price}
                      </Grid>
                      <Grid
                        item
                        md={2}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Button onClick={() => removeItemHandler(item)}>
                          <DeleteOutlinedIcon sx={{ color: "black" }} />
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </Paper>
            </List>
          )}
        </Grid>
        <Grid item md={4}>
          {/* <Paper elevation={3}> */}
          <List>
            <ListItem>
              <h3>
                SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                {""} items : $
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)})
              </h3>
            </ListItem>
            <Divider></Divider>
            <ListItem>
              <div style={{ display: "grid", width: "100%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to Check Out
                </Button>
              </div>
            </ListItem>
          </List>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}
