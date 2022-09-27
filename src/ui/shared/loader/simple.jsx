import { Backdrop, CircularProgress } from "@mui/material";

const Simple = () => {
  return (
    <Backdrop open sx={{ zIndex: 9999999999 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Simple;
