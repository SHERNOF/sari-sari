import Snackbar from '@mui/material/Snackbar';
import {React, useState} from 'react'

export default function Toast(props){
    const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
    return (
        <div>
        <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        // action={action}
      >{props.children}</Snackbar>
        </div>
 
    )
       
}