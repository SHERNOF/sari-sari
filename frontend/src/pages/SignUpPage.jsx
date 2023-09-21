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

export default function SignUpPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      ctxDispatch(setSnackbar(true, "error", "Password did not match"));
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
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
        <title>Sign Up</title>
      </Helmet>
      <Box sx={{ width: "100%", textAlign: "left", marginBottom: "3rem" }}>
        <StyledH1
          style={{ marginBottom: "3rem", textAlign: "left", width: "100%" }}
        >
          Sign Up
        </StyledH1>
      </Box>
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
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormElements>
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormElements>
        <FormElements>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-search"
            label="Confirm Password"
            type="password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormElements>
        <FormElements>
          <Button type="submit">Sign Up</Button>
        </FormElements>
        <div style={{ textAlign: "left", width: "100%" }}>
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </form>
    </Box>
  );
}
