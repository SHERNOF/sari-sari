import { Container } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { setSnackbar, Store } from "../store";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Loading from "../components/Loading";
import FormElements from "../ui/formElements/FormElements";
import { TextField } from "@mui/material";
import Button from "../ui/button/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true };
    case "UPLOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function ProductEditPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        dispatch({ type: "FETCH_REUQEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setDesc(data.desc);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDetailedDescription(data.detailedDescription);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [productId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          desc,
          price,
          image,
          category,
          brand,
          countInStock,
          detailedDescription,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_REQUEST" });
      ctxDispatch(
        setSnackbar(true, "success", "Product successfully updated...")
      );
      navigate("/admin/products");
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      ctxDispatch(setSnackbar(true, "success", "Image uploaded successfully"));
      setImage(data.secure_url);
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };
  return (
    <div>
      <Container>
        <Helmet>
          <title>Edit Product ${productId}</title>
        </Helmet>
        <h1>Edit Product</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <form
            style={{
              display: "flex",
              width: "40%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={submitHandler}
          >
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="desc"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormElements>

            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Image"
                type="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </FormElements>

            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                // label="Upload File"
                type="file"
                onChange={uploadFileHandler}
                required
              />
              {loadingUpload && <Loading />}
            </FormElements>

            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Count In Stock"
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Detailed Description"
                type="text"
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                required
              />
            </FormElements>
            <FormElements>
              <Button disabled={loadingUpdate} type="submit">
                Update
              </Button>
              {loadingUpdate && <Loading />}
            </FormElements>
          </form>
        )}
      </Container>
    </div>
  );
}
