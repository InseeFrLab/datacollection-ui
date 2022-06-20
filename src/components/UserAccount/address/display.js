import { Typography } from "@mui/material";
import React from "react";

export const AddressDisplay = ({ address, title = true }) => {
  const { streetNumber, streetName, zipCode, city, countryName } = address;

  return (
    <div className="address-display">
      {title && <h3>Mon adresse</h3>}
      <Typography>
        <b>{`N° et rue: `}</b>
        {`${streetNumber} - ${streetName}`}
      </Typography>
      <Typography>
        <b>{`Code postal: `}</b>
        {zipCode}
        <b>{` Commune: `}</b>
        {city}
      </Typography>
      <Typography sx={{ textTransform: "uppercase" }}>
        <b>{`Pays: `}</b>
        {countryName}
      </Typography>
    </div>
  );
};
