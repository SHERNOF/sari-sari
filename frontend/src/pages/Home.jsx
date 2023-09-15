import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import StyledH1 from "../ui/pageTitle/PageTitle";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        // setproducts(result.data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>sari-sari</title>
      </Helmet>

      <StyledH1>Product Selection</StyledH1>

      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Product key={product.desc} product={product}></Product>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
