import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Simple = () => {
  return (
    <Backdrop open sx={{ zIndex: 9999999999 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Simple;
