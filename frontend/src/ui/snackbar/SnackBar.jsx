import { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { setSnackbar, Store } from "../../store";
import Alert from "@mui/material/Alert";

export default function SnackBar() {
  // const [open, setOpen] = useState(false);
  const { state, dispacth: ctxDispatch } = useContext(Store);
  const { snackBarOpen, snackBarMessage, snackBarType } = state;

  // const handleClick = () => {
  //   ctxDispatch({ type: "TOAST_CLOSE" });
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    ctxDispatch(setSnackbar(false, snackBarType, snackBarMessage));
  };

  return (
    <div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        message={snackBarMessage}
        severity={snackBarType}
        // action={action}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackBarType}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
