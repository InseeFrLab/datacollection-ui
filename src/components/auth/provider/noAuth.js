import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import { useAPI } from '../../../utils/hooks/api';

export const NoAuthLogin = ({ setId }) => {
  const { apiUrl, setLoading } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState('');
  const { getFirstContacts } = useAPI();

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true);
      const { data } = await getFirstContacts();
      if (data) {
        const {
          _embedded: { contacts: contactsFetched },
        } = data;
        setContacts(contactsFetched);
        setLoading(false);
      }
    };
    if (contacts.length === 0) loadContact();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const handleChange = event => {
    setSelected(event.target.value);
  };

  const chooseUser = id => {
    const {
      _links: {
        self: { href: uriAcess },
      },
    } = contacts[id];
    const retrievedId = uriAcess.split(`${apiUrl}/contacts/`)[1];
    setId(retrievedId);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Contact</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Age"
          onChange={handleChange}
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
      </FormControl>
      <Button onClick={() => chooseUser(selected)}>
        Choisir l'utilisateur
      </Button>
    </div>
  );
};
