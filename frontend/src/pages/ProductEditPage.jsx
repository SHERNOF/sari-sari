
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { setSnackbar, Store } from "../store";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Loading from "../components/Loading";
import FormElements from "../ui/formElements/FormElements";
import { Box, Button, TextField } from "@mui/material";

import StyledH1 from "../ui/pageTitle/PageTitle";
import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StyledButton from "../ui/button/Button";





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
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


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
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REUQEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        console.log(data)
        setName(data.name);
        setDesc(data.desc);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images)
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
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          desc,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          detailedDescription,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch(
        setSnackbar(true, "success", "Product successfully updated...")
      );
      navigate("/admin/products");
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
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
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      ctxDispatch(setSnackbar(true, "success", "Image uploaded successfully"));
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    ctxDispatch(
      setSnackbar(
        true,
        "success",
        "Image removed successfully. click Update to apply it"
      )
    );
  };
  return (
    <Box
      sx={{
        minHeight: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet>
      <div style={{ width: "100%" }}>
        <StyledH1 style={{ textAlign: "left", width: "100%" }}>
          Edit Product {productId}
        </StyledH1>
      </div>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: { md: "50%", xs: "100%" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={submitHandler}
          >
            <FormElements>
              <TextField
                sx={{ width: "100%" }}
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
                label="Price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormElements>

            <FormElements>
              <TextField   label="Image File" sx={{ width: "100%" }} value={image} onChange={(e) => setImage(e.target.value)}
              required>
              </TextField>
            </FormElements>

            <FormElements >
            <TextField type="file" onChange={uploadFileHandler} />
            {loadingUpload && <Loading></Loading>}
          </FormElements>

       

            <FormElements >
              <div style={{ width:'60%', display:'flex', justifyContent:'flex-start'}}>
              <Button  component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Image
                  <VisuallyHiddenInput  type="file" onChange={uploadFileHandler}/>
                  {loadingUpload && <Loading></Loading>}
              </Button>
              </div>
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
              <StyledButton disabled={loadingUpdate} type="submit">
                Update
              </StyledButton>
              {loadingUpdate && <Loading />}
            </FormElements>
          </form>
        </Box>
      )}
      {/* </Container> */}
    </Box>
  );
}
