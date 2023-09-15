import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import Button from "@mui/material/Button";
import Button from "../ui/button/Button";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../store";
import StyledH1 from "../ui/pageTitle/PageTitle";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { desc } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/desc/${desc}`);
        console.log(result);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Product not found...");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <Box sx={{ marginTop: "10rem", minHeight: "100vh" }}>
      {loading ? (
        <Loading />
      ) : error ? (
        // <div>{error}</div>
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <Grid container spacing={6}>
          <Grid item md={4} xs={12}>
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%" }}
            ></img>
          </Grid>
          <Grid item md={4} xs={12}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItemText>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListItemText>
              <Divider />
              <ListItemText>
                <RatingComponent rating={product.rating} />
              </ListItemText>
              <Divider />
              <ListItemText>${product.price}</ListItemText>
              <Divider />
              <ListItemText>
                Description: {product.detailedDescription}
              </ListItemText>
              <Divider />
            </List>
          </Grid>
          <Grid item md={4} xs={12} sx={{ widt: "100%" }}>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <Grid container spacing={12}>
                      <Grid item>Price : </Grid>
                      <Grid item> {product.price}</Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Grid container>
                      <Grid item md={6} xs={6}>
                        Status :{" "}
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <div
                          style={{
                            display: "grid",
                          }}
                        >
                          {product.countInStock > 0 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              {product.countInStock}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="error"
                              disableRipple
                              size="small"
                            >
                              {product.countInStock}
                            </Button>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Grid item md={12} xs={12}>
                      <div style={{ display: "grid" }}>
                        {product.countInStock > 0 && (
                          <Button
                            onClick={addToCartHandler}
                            color="success"
                            variant="contained"
                          >
                            ADD TO CART
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
