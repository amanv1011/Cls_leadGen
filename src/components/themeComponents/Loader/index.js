import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function Loader({ openLoader }) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#003AD2",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "transparent",
        }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Loader;
