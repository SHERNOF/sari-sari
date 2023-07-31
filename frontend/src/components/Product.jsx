import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import RatingComponent from "./RatingComponent";

export default function Product({ product }) {
  return (
    <Grid item xs={12} md={4} lg={3} style={{ marginBottom: "2rem" }}>
      <Card>
        <CardContent className="product">
          <CardMedia>
            <Link to={`/product/${product.desc}`}>
              <img src={product.image} alt={product.name} />
            </Link>
          </CardMedia>
          <CardContent className="product-info">
            <Link
              style={{ textDecoration: "none" }}
              to={`/product/${product.desc}`}
            >
              <h3>{product.name}</h3>
            </Link>
            <RatingComponent rating={product.rating}></RatingComponent>
            <p style={{ marginTop: "-0.3rem" }}>
              <strong>{product.numReviews} reviews</strong>
            </p>
            <p>
              <strong>${product.price}</strong>
            </p>

            <Button variant="contained">ADD TO CART</Button>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}
