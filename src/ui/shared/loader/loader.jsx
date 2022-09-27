import "./loader.css";
import { Backdrop, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop open>
      <Typography>Chargement ....</Typography>
    </Backdrop>
  );
};

export default Loader;
