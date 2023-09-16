import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Button from "../ui/button/Button";
import RatingComponent from "./RatingComponent";
import axios from "axios";
import { Store } from "../store";
import { Typography } from "@mui/material";
import StyledLink from "../ui/links/StyledLink";

export default function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <Grid item xs={12} md={4} lg={3} style={{ marginBottom: "2rem" }}>
      <Card>
        <CardContent className="product">
          <CardMedia>
            <StyledLink to={`/product/${product.desc}`}>
              {/* <div style={{ height: { md: "300px", lg: "300px" } }}> */}
              <div style={{ height: "300px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ minHeight: { md: "100%", xs: "120%" } }}
                />
              </div>
            </StyledLink>
          </CardMedia>
          <CardContent className="product-info">
            <Typography>{product.name}</Typography>

            <RatingComponent rating={product.rating}></RatingComponent>
            <p style={{ marginTop: "-0.3rem" }}>
              <strong>{product.numReviews} reviews</strong>
            </p>
            <p>
              <strong>${product.price}</strong>
            </p>
            {product.countInStock === 0 ? (
              <Button variant="outlined" disabled>
                OUT OF STOCK
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => addToCartHandler(product)}
              >
                ADD TO CART
              </Button>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}
