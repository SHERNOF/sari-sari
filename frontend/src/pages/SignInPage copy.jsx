import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link, redirect } from "react-router-dom";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";

export default function SignInPage() {
  return (
    <Container className="small-container">
      {/* <Container> */}
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 style={{ marginBottom: "3rem" }}>Sign In</h1>
      <form>
        <div
          style={{
            width: "50%",
            display: "flex",
            border: "1px solid red",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* <div> */}
          <Label htmlFor="email">Email</Label>
          <input type="email"></input>
          {/* </div> */}
          {/* <div> */}
          <Label htmlFor="password">Password</Label>
          <input type="password"></input>
          {/* </div> */}
          {/* <div> */}
          <Button type="submit">Sign In</Button>
          {/* </div> */}
          {/* <div> */}
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          {/* </div> */}
        </div>
      </form>
    </Container>
  );
}
