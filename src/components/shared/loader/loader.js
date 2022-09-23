import React from "react";
import "./loader.css";
import { Backdrop, Typography } from "@mui/material";

const Loader = ({ info }) => {
    return (
        <Backdrop open>
            <Typography>Chargement ....</Typography>
        </Backdrop>
    );
};

export default Loader;
