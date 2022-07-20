import { Typography } from "@mui/material";
import React from "react";

export const AddressDisplay = ({ address }) => {
  const { streetNumber, streetName, zipCode, city, countryName } = address;

  return (
    <div className="address-display">
      <Typography>{`${streetNumber}  ${streetName}`}</Typography>
      <Typography>{`${zipCode}  ${city}`}</Typography>
      <Typography sx={{ textTransform: "uppercase" }}>{countryName}</Typography>
    </div>
  );
};
