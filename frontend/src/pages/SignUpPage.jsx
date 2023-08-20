import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import FormElements from "../ui/formElements/FormElements";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { setSnackbar, Store } from "../store";
import { getError } from "../utils";

export default function SignUpPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [isAdmin, setisAdmin] = useState("");
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
        // isAdmin: false,
      });
      console.log(data);
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "");
      ctxDispatch(setSnackbar(true, "success", "Welcome to Your Page"));
    } catch (err) {
      ctxDispatch(setSnackbar(true, "error", getError(err)));
      console.log(typeof err);
    }
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
        <title>Sign Up</title>
      </Helmet>
      <h1
        style={{
          marginBottom: "3rem",
          textAlign: "left",
          width: "100%",
        }}
      >
        Sign Up
      </h1>

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
      {/* </div> */}
      {/* <Button onClick={handleClick}>Test</Button> */}
    </div>
  );
}
