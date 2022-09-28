import { Button, Card } from "@mui/material";
import { useContext, useState } from "react";
import { UserAccountContext } from "../../../context/UserAccount";
import { AddressDisplay } from "./display";
import { AddressForm } from "./form";
import { buttonDictionary } from "i18n";

export const AddressBlock = () => {
  const {
    user: { address },
  } = useContext(UserAccountContext);

  const [addressEdit, setAddressEdit] = useState(false);

  const closeAddessEdit = () => {
    setAddressEdit(false);
  };

  return (
    <Card
      sx={{
        p: 2,
      }}
    >
      <AddressDisplay address={address} />
      <Button onClick={() => setAddressEdit(true)} variant="contained">
        {buttonDictionary.edit}
      </Button>
      <AddressForm open={addressEdit} close={closeAddessEdit} address={address} />
    </Card>
  );
};
