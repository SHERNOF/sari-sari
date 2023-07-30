import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";

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
              <li>{product.name}</li>
              <li>
                <RatingComponent rating={product.rating} />
              </li>
              <li>{product.price}</li>
              <li>{product.numReviews}</li>
            </ul>
          </Grid>
          <Grid item md={3}>
            Test2
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
