import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { setSnackbar, Store } from "../store";
import FormElements from "../ui/formElements/FormElements";
import { getError } from "../utils";

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setemail] = useState(userInfo.email);
  const [password, setPassword] = useState(userInfo.password);
  const [confirmPassword, setConfirmPassword] = useState(
    userInfo.confirmPassword
  );
  const reducer = (state, action) => {
    switch (action.type) {
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
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      ctxDispatch(setSnackbar(true, "success", "User updated successfully"));
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      ctxDispatch(setSnackbar(true, "error", getError(err)));
    }
  };
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
        <title>User Info</title>
      </Helmet>
      <h1
        style={{
          marginBottom: "3rem",
          textAlign: "left",
          width: "100%",
        }}
      >
        User Info
      </h1>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          width: "40%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
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
            label="Email"
            type="email"
            value={email}
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
          <Button type="submit" variant="outlined" sx={{ width: "100%" }}>
            Update
          </Button>
        </FormElements>
      </form>
    </div>
  );
}
