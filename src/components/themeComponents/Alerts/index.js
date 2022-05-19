import React, { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertNotification = ({ isAlertOpen, message, type, handleClose }) => {
  return (
    // <Stack spacing={2} sx={{ width: "15px", height: "15px" }}>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isAlertOpen}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%", marginTop: "32px" }}
      >
        {message}
      </Alert>
    </Snackbar>

    // </Stack>
  );
};
export default AlertNotification;
