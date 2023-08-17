import React, { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { setSnackbar, Store } from "../../store";
import MuiAlert from '@mui/material/Alert';

// import { useDispatch, useSelector } from "react-redux";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar() {
  
  const { state, dispacth: ctxDispatch } = useContext(Store);
  const { snackbarOpen, snackbarMessage, snackbarType } = state;

  // const dispatch = useDispatch();
  // const snackbarOpen = useSelector(state => state.snackbar.snackbarOpen);
  // const snackbarType = useSelector(state => state.snackbar.snackbarType);
  // const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);
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
        autoHideDuration={1500}
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
