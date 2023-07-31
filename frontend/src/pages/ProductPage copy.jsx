import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
  const params = useParams();
  const { desc } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/desc/${desc}`);
        console.log(result);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [desc]);

  return (
    <Box sx={{ border: "1px solid red", height: "100%" }}>
      {loading ? (
        <div>LOADING...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%" }}
            ></img>
          </Grid>
          <Grid item md={3}>
            <ul>
              <li>
                <h3>{product.name}</h3>
              </li>

              <li>
                <RatingComponent rating={product.rating} />
              </li>
              <li style={{ marginTop: "-.5rem" }}>${product.price}</li>
              <li>Description: {product.detailedDescription}</li>
            </ul>
          </Grid>
          <Grid item md={3}>
            <Card>
              <CardContent>
                <ul>
                  <li>
                    <Grid container spacing={12}>
                      <Grid item>Price : </Grid>
                      <Grid item> {product.price}</Grid>
                    </Grid>
                  </li>
                  <li>
                    <Grid container spacing={12}>
                      <Grid item>Status : </Grid>
                      <Grid item> {product.countInStock > 0}</Grid>
                    </Grid>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
