import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import FormElements from "../ui/formElements/FormElements";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { setSnackbar, Store } from "../store";
import { getError } from "../utils";
import StyledH1 from "../ui/pageTitle/PageTitle";
import { Box } from "@mui/system";

export default function SignInPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "");
      ctxDispatch(setSnackbar(true, "success", "Welcome to Your Page"));
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

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
        <title>Sign In</title>
      </Helmet>
      <Box
        sx={{
          width: "100%",

          textAlign: "left",
          marginBottom: "3rem",
        }}
      >
        <StyledH1
          style={{ marginBottom: "3rem", textAlign: "left", width: "100%" }}
        >
          Sign In Page
        </StyledH1>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: { md: "40%", xs: "100%" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <FormElements>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-search"
              label="Email"
              type="email"
              value={email || ""}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </FormElements>
          <FormElements>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-search"
              label="Password"
              type="password"
              value={password || ""}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </FormElements>
          <FormElements>
            <Button type="submit">Sign In</Button>
          </FormElements>
          <div style={{ textAlign: "left", width: "100%" }}>
            New Customer?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </form>
      </Box>
    </Box>
  );
}
