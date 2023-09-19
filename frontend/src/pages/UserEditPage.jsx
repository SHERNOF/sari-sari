import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store, setSnackbar } from "../store";
import Loading from "../components/Loading";
import FormElements from "../ui/formElements/FormElements";
import { Container, TextField } from "@mui/material";
import StyledButton from "../ui/button/Button";
import StyledH1 from "../ui/pageTitle/PageTitle";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";

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
    default:
      return state;
  }
};

export default function UserEditPage() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch(setSnackbar(true, "success", "User updated successfully"));

      navigate("/admin/users");
    } catch (error) {
      ctxDispatch(setSnackbar(true, "error", getError(error)));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Edit User ${userId}</title>
      </Helmet>
      <div style={{ width: "100%", marginBottom: "2rem" }}>
        <StyledH1>Edit User {userId}</StyledH1>
      </div>

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
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
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <FormElements className="mb-3" controlId="name">
              {/* <Form.Label>Name</Form.Label> */}
              <TextField
                sx={{ width: "100%" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                id="outlined-search"
                label="Name"
                type="text"
              />
            </FormElements>
            <FormElements className="mb-3" controlId="email">
              {/* <Form.Label>Email</Form.Label> */}
              <TextField
                sx={{ width: "100%" }}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-search"
                label="Email"
              />
            </FormElements>

            <Checkbox
              sx={{ marginBottom: "2rem" }}
              // type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <FormElements>
              <div style={{ marginBottom: "2rem", width: "100%" }}>
                <StyledButton disabled={loadingUpdate} type="submit">
                  Update
                </StyledButton>
                {loadingUpdate && <Loading></Loading>}
              </div>
            </FormElements>
          </form>
        </Box>
      )}
    </Box>
  );
}
