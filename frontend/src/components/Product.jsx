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
            <Link to={`/product/${product.desc}`}>
              <p>{product.name}</p>
            </Link>
            <RatingComponent
              numReviews={product.numReviews}
              rating={product.rating}
            ></RatingComponent>
            <p>
              <strong>{product.price}</strong>
            </p>

            <Button variant="contained">ADD TO CART</Button>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}
