import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserAccountContext } from "./context";
import { AddressBlock } from "./address";

export const UserAccount = () => {
  const {
    user: { account },
    // updateAccount,
  } = useContext(UserAccountContext);

  return (
    <>
      <p className="welcomeUser">
        Pour bénéficier pleinement des services proposés sur ce portail, pensez
        à renseigner ou à mettre à jour régulièrement vos données personnelles.
        Si vous choisissez par exemple de renseigner votre adresse de
        messagerie, vous pourrez recevoir votre nouveau mot de passe par
        courriel dans les minutes qui suivent votre demande de réinitialisation.
      </p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Mon compte - Accès</h3>
        <TextField
          disabled
          id="outlined-name"
          label="Adresse de messagerie"
          value={account?.email}
        />
        <Button>Modifier</Button>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Gérer mes identifiants de connexion</h3>
        <Button>Liste des enquêtes liées à mon compte</Button>
        <Button>Autres enquêtes liées à mon adresse de messagerie</Button>
        <Button>
          Vous avez reçu un nouveau compte que vous souhaitez associer au compte
          ?
        </Button>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Mes infos personnelles</h3>
        <TextField
          id="outlined-name"
          label="Nom"
          disabled
          value={account.lastName}
        />
        <TextField
          id="outlined-name"
          label="Prénom"
          disabled
          value={account.firstName}
        />
        <TextField
          id="outlined-name"
          label="Fonction"
          disabled
          value={account.function}
        />
        <TextField
          id="outlined-name"
          label="Téléphone"
          disabled
          value={account.phone}
        />
        <Button>Modifier</Button>
      </Box>
      <AddressBlock />
    </>
  );
};
