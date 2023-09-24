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
import { Link, useNavigate, useParams } from "react-router-dom";
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
import StyledButton from "../ui/button/Button";
import Rating from "../components/Rating";
import FloatingLabel from "../components/FloatingLabel";
import Textarea from "@mui/joy/Textarea";

import {
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import StyledLink from "../ui/links/StyledLink";

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
  // const [rating, setRating] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
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
  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/desc/${desc}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [desc]);

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
      console.log(data);

      dispatch({
        type: "CREATE_SUCCESS",
      });

      ctxDispatch(
        setSnackbar(true, "success", "Review submitted successfully")
      );
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

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox severity="error">{error}</MessageBox>
  ) : (
    <Box sx={{ marginTop: "10rem", minHeight: "100vh" }}>
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

      <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div>
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
        <div>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <FormGroup
                className="mb-3"
                // controlId="rating"
              >
                <FormLabel>Rating</FormLabel>
                <Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Rating"
                  sx={{ marginBottom: "2rem" }}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </Select>
              </FormGroup>
              {/* <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                sx={{ marginTop: "2rem" }}
               >
                <FormControl
                as="textarea"
                placeholder="Leave a comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              </FloatingLabel> */}

              {/* <FloatingLabel></FloatingLabel> */}
              {/* 
              <Textarea
                color="neutral"
                minRows={2}
                size="lg"
                variant="outlined"
                label="Comments"
                sx={{ marginTop: "2rem" }}
              /> */}

              <div style={{ marginTop: "1rem" }}>
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
