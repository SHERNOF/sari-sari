import * as React from "react";
import Button from "@mui/material/Button";

export default function StyledButton(props) {
  return (
    <Button
      variant="contained"
      type={props.type || "button"}
      disabled={props.disabled || null}
      onClick={props.onClick}
      sx={{ fontSize: ".7em", width: { xs: "100%", md: "inherit" } }}
    >
      {props.children}
    </Button>
  );
}
