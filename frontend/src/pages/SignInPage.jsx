import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import FormElements from "../ui/formElements/FormElements";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";
import axios from "axios";
import {  Store } from "../store";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/snackbar";


export default function SignInPage() {

  const dispatch = useDispatch();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, snackBarOpen } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "");
    } catch (err) {
      dispatch(setSnackbar(true, "success", "Not Nice"));
      console.log(snackBarOpen);
      
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
      <h1
        style={{
          marginBottom: "3rem",
          textAlign: "left",
          width: "100%",
        }}
      >
        Sign In
      </h1>
      <form
        style={{
          display: "flex",
          width: "40%",
          // border: "1px solid blue",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={submitHandler}
      >
        <FormElements>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            required
            onChange={(e) => setemail(e.target.value)}
            value={email || ""}
          ></Input>
        </FormElements>
        <FormElements>
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password || ""}
          ></Input>
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
