// import React from "react";
// import classes from "./button.module.css";

// export default function StyledButton(props) {
//   return (
//     <button
//       type={props.type || "button"}
//       className={classes.button}
//       disabled={props.disabled || ""}
//       onClick={props.onClick}
//     >
//       {props.children}
//     </button>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";

export default function StyledButton(props) {
  return (
    <Button
      variant="contained"
      type={props.type || "button"}
      disabled={props.disabled || null}
      onClick={props.onClick}
      sx={{ fontSize: ".7em"}}
    >
      {props.children}
    </Button>
  );
}
