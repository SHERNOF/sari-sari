import { styled, alpha } from "@mui/material/styles";

const H1 = styled("h1")(({ theme }) => ({
  marginTop: "6rem",
}));

export default function StyledH1(props) {
  return <H1>{props.children}</H1>;
}
