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

    setemail("");
    setpassword("");
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      {/* <h1
        style={{
          marginBottom: "3rem",
          textAlign: "left",
          width: "100%",
        }}
      >
        Sign In
      </h1> */}
      <StyledH1
        style={{ marginBottom: "3rem", textAlign: "left", width: "100%" }}
      >
        SignIn Page
      </StyledH1>
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
      {/* <Button onClick={handleClick}>Test</Button> */}
    </div>
  );
}
