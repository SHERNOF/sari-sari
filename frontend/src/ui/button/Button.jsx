import React from "react";
import classes from "./button.module.css";

export default function Button(props) {
  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      disabled={props.disabled || ""}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
