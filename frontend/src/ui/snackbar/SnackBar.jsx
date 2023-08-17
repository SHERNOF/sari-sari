import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import { setSnackbar, Store } from "../../store";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { snackbarOpen, snackbarType, snackbarMessage } = state;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    ctxDispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };
  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        message={snackbarMessage}
        severity={snackbarType}
        // action={action}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
