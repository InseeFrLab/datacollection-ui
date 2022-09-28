import { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Grid, Grow, Typography } from "@mui/material";
import { UserAccountContext } from "./context";
import { AddressBlock } from "./address";
import { menuDictionary, buttonDictionary } from "i18n";

export const UserAccount = () => {
  const {
    user,
    // updateAccount,
  } = useContext(UserAccountContext);

  return (
    <>
      <div className="welcomeUser">
        Pour bénéficier pleinement des services proposés sur ce portail, pensez à renseigner ou à mettre
        à jour régulièrement vos données personnelles. Si vous choisissez par exemple de renseigner votre
        adresse de messagerie, vous pourrez recevoir votre nouveau mot de passe par courriel dans les
        minutes qui suivent votre demande de réinitialisation.
      </div>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={3}>
          <Grid item container xs={12} spacing={3}>
            <Grow in style={{ transformOrigin: "0 0 0" }} timeout={400}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ p: 1, textTransform: "uppercase" }}>
                  Mon compte - Accès
                </Typography>
                <Card
                  sx={{
                    p: 2,
                  }}
                >
                  <TextField
                    disabled
                    id="outlined-name"
                    label="Adresse de messagerie"
                    fullWidth
                    value={user?.email}
                  />
                  <Button>{buttonDictionary.edit}</Button>
                </Card>
              </Grid>
            </Grow>
            <Grow in style={{ transformOrigin: "0 0 0" }} timeout={800}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" sx={{ p: 1, textTransform: "uppercase" }}>
                  Gérer mes identifiants de connexion
                </Typography>
                <Card
                  sx={{
                    p: 2,
                  }}
                >
                  <Button>Liste des enquêtes liées à mon compte</Button>
                  <Button>Autres enquêtes liées à mon adresse de messagerie</Button>
                  <Button>
                    Vous avez reçu un nouveau compte que vous souhaitez associer au compte ?
                  </Button>
                </Card>
              </Grid>
            </Grow>
          </Grid>

          <Grid item container xs={12} spacing={3}>
            <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" sx={{ p: 1, textTransform: "uppercase" }}>
                  {menuDictionary.myAddress}
                </Typography>
                <AddressBlock />
              </Grid>
            </Grow>
            <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1200}>
              <Grid item xs={12} sm={7}>
                <Typography variant="h6" sx={{ p: 1, textTransform: "uppercase" }}>
                  {menuDictionary.myPersonalData}
                </Typography>
                <Card
                  sx={{
                    p: 2,
                  }}
                >
                  <TextField id="outlined-name" label="Nom" disabled value={user.lastName} />
                  <TextField id="outlined-name" label="Prénom" disabled value={user.firstName} />
                  <TextField id="outlined-name" label="Fonction" disabled value={user.function} />
                  <TextField id="outlined-name" label="Téléphone" disabled value={user.phone} />
                  <Button>{buttonDictionary.edit}</Button>
                </Card>
              </Grid>
            </Grow>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
