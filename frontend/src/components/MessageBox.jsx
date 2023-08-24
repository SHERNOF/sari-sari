import React from "react";
import Alert from "@mui/material/Alert";

export default function MessageBox(props) {
  return (
    <Alert sx={{ marginTop: "1rem" }} severity={props.severity}>
      {props.children}
    </Alert>
  );
}
