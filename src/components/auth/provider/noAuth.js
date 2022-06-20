import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { useAPI } from "../../../utils/hooks/api";

export const NoAuthLogin = ({ setId }) => {
  const { apiUrl, setLoading } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState("");
  const { getFirstContacts } = useAPI();

  const [idSelected, setIdSelected] = useState("");

  const [chooseType, setChooseType] = useState("");

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true);
      const { data } = await getFirstContacts();
      if (data) {
        const {
          _embedded: { contacts: contactsFetched },
        } = data;
        setContacts(contactsFetched);
      }

      setLoading(false);
    };
    if (contacts.length === 0 && chooseType === "list") loadContact();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, chooseType]);

  const handleChangeChooseType = (event) => {
    setChooseType(event.target.value);
  };
  const handleChangeSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleChangeInput = (event) => {
    setIdSelected(event.target.value);
  };

  const chooseUser = (type) => {
    if (type === "list") {
      const {
        _links: {
          self: { href: uriAcess },
        },
      } = contacts[selected];
      const retrievedId = uriAcess.split(`${apiUrl}/contacts/`)[1];
      setId(retrievedId);
    } else if (type === "id") setId(idSelected);
  };

  return (
    <div className="form-no-auth">
      <Typography variant="h3">Veuillez choisir un contact</Typography>
      <br />
      <FormControl fullWidth>
        <InputLabel id="choose-label">Choix du contact</InputLabel>
        <Select
          labelId="choose-label"
          id="choose-simple-select"
          value={chooseType}
          label="Contact"
          onChange={handleChangeChooseType}
        >
          {[
            { type: "list", label: "Choisir dans une liste" },
            { type: "id", label: "Avec un identifiant" },
          ].map(({ type, label }, index) => (
            <MenuItem key={`${index}-item`} value={type}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <br />
        {chooseType === "id" && (
          <>
            <TextField
              id="demo-simple-text"
              value={idSelected}
              label="Identifiant"
              onChange={handleChangeInput}
            />
          </>
        )}
        {chooseType === "list" && contacts.length > 0 && (
          <>
            <InputLabel id="demo-simple-select-label">Contact</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Contact"
              onChange={handleChangeSelect}
            >
              {contacts.map(
                ({ lastName, firstName, function: serviceFunction }, index) => (
                  <MenuItem
                    key={`${index}-item`}
                    value={index}
                  >{`${lastName} ${firstName} - ${serviceFunction}`}</MenuItem>
                )
              )}
            </Select>
          </>
        )}
      </FormControl>

      {chooseType && (selected || idSelected) && (
        <Button onClick={() => chooseUser(chooseType)}>
          Choisir l'utilisateur
        </Button>
      )}
    </div>
  );
};
