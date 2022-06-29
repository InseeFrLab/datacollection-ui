import { ContactSupport } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AuthContext } from "components/auth/provider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="header">
      <img src={`${process.env.PUBLIC_URL}/logo-proto.png`} alt="alt" />

      <h1>Portail de réponse aux enquêtes de la statistique publique</h1>
      <div className="kfc">
        <Link to="/portail">
          <ContactSupport /> Aide et contact
        </Link>
        <Link to="/portail">Contacter l'assistance</Link>
        <Button onClick={logout}>Se déconnecter</Button>
      </div>
    </div>
  );
};
