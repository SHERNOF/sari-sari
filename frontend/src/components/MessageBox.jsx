import React from "react";
import Alert from "@mui/material/Alert";

export default function MessageBox(props) {
  return <Alert severity={props.severity}>{props.children}</Alert>;
}
