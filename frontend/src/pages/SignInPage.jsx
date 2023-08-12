import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/button/Button";
import FormElements from "../ui/formElements/FormElements";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";

export default function SignInPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const signInHandler = () => {};

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
      >
        <FormElements>
          <Label htmlFor="email">Email</Label>
          <Input type="email" required></Input>
        </FormElements>
        <FormElements>
          <Label htmlFor="password">Password</Label>
          <Input required type="password"></Input>
        </FormElements>
        <FormElements>
          <Button type="submit" onCLick={signInHandler}>
            Sign In
          </Button>
        </FormElements>
        <div style={{ textAlign: "left", width: "100%" }}>
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </form>
    </div>
  );
}
