import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import RatingComponent from "./RatingComponent";
import axios from "axios";
import { Store } from "../store";
import { Typography } from "@mui/material";
import StyledLink from "../ui/links/StyledLink";
import { Box } from "@mui/system";
import StyledButton from "../ui/button/Button";
import Rating from "./Rating";

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
              <Box
                sx={{
                  height: { lg: "300px", sm: "200px" },
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ minHeight: "100%" }}
                  loading="lazy"
                />
              </Box>
            </StyledLink>
          </CardMedia>
          <CardContent className="product-info">
            <Typography>{product.name}</Typography>

            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            <p style={{ marginTop: "-0.3rem" }}>
              <strong>{product.numReviews} reviews</strong>
            </p>
            <p>
              <strong>${product.price}</strong>
            </p>

            {product.countInStock === 0 ? (
              <div
                style={{
                  display: "grid",
                  width: "100%",
                }}
              >
                <StyledButton variant="outlined" disabled>
                  OUT OF STOCK
                </StyledButton>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  width: "100%",
                }}
              >
                <StyledButton
                  variant="contained"
                  onClick={() => addToCartHandler(product)}
                >
                  ADD TO CART
                </StyledButton>
              </div>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}
