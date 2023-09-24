import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Button from "../ui/button/Button";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { setSnackbar, Store } from "../store";
import StyledH1 from "../ui/pageTitle/PageTitle";
import StyledButton from "../ui/button/Button";
import Rating from "../components/Rating";
import FloatingLabel from "../components/FloatingLabel";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };

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
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { desc } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
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
  const { cart, userInfo } = state;

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      ctxDispatch(
        setSnackbar(true, "error", "Please enter comment and rating")
      );
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "CREATE_SUCCESS",
      });

      ctxDispatch(
        setSnackbar(true, "success", "Review submitted successfully")
      );
      console.log(data);
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      ctxDispatch(setSnackbar(true, "error", getError(error)));
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  return (
    <Box sx={{ marginTop: "10rem", minHeight: "100vh" }}>
      {loading ? (
        <Loading />
      ) : error ? (
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
                            <StyledButton
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              {product.countInStock}
                            </StyledButton>
                          ) : (
                            <StyledButton
                              variant="contained"
                              color="error"
                              disableRipple
                              size="small"
                            >
                              {product.countInStock}
                            </StyledButton>
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
      <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <List>
          {product.reviews.map((review) => (
            <ListItem key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListItem>
          ))}
        </List>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <FormControl
                className="mb-3"
                // controlId="rating"
              >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Rating
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rating}
                      label="Age"
                      // onChange={handleChange}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <MenuItem value={""}>Select...</MenuItem>
                      <MenuItem value={1}>1- Poor</MenuItem>
                      <MenuItem value={2}>2- Fair</MenuItem>
                      <MenuItem value={3}>3- Good</MenuItem>
                      <MenuItem value={4}>4- Very good</MenuItem>
                      <MenuItem value={5}>5 - Excelllent</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </FormControl>
              <FloatingLabel
                // controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <FormControl
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <Loading></Loading>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{" "}
              <Link to={`/signin?redirect=/product/${product.desc}`}>
                Sign In
              </Link>{" "}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </Box>
  );
}
