import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { useAPI } from "core/hooks/api";
import { notifDictionary } from "i18n";
import { ERROR_TYPE } from "core/constants";
import "./noAuth.css";

export const NoAuthLogin = ({ setId }) => {
  const { portailUrl, setLoading, openNotif } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState("");
  const [idSelected, setIdSelected] = useState("");
  const [chooseType, setChooseType] = useState(false);
  const { getFirstContacts } = useAPI();

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true);
      const { data, error } = await getFirstContacts();
      if (data) {
        const { content: contactsFetched } = data;
        setContacts(contactsFetched);
      }
      if (error) {
        openNotif({
          severity: ERROR_TYPE,
          message: notifDictionary.contactLoadingError,
        });
      }

      setLoading(false);
    };
    if (contacts.length === 0 && chooseType) loadContact();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, chooseType]);

  const handleChangeChooseType = event => {
    setSelected("");
    setIdSelected("");
    setChooseType(event.target.checked);
  };
  const handleChangeSelect = event => {
    setSelected(event.target.value);
  };

  const handleChangeInput = event => {
    setIdSelected(event.target.value);
  };

  const chooseUser = type => {
    if (type) {
      const { identifier } = contacts[selected];
      setId(identifier);
    } else if (!type) setId(idSelected);
  };

  return (
    <div className="main-body">
      <header id="bandeauSuperieur">
        <div className="img-left">
          <img src="/img/logo-marianne.png" alt="Logo de la Marianne" />
        </div>
        <h1 id="titrePortail" className="nospace">
          {"Portail d'authentification"}
          <br />
          <span id="nomappli">{"Réponse aux enquêtes de la statistique publique"}</span>
        </h1>
        <div className="img-right">
          <img src="/img/logo-ssp.jpg" alt="Logo de la Statistique publique" />
        </div>
      </header>
      <img className="bandeau-img" src="/img/bandeau-coleman-1680X315px.png" alt="bandeau" />
      <hr />
      <div id="contenu">
        <div className="flex-contenu">
          <div className="group panel-default">
            <div className="group-heading">{"Aide à la connexion"}</div>

            <div className="group-body">
              <p>
                {`Pour vous authentifier, veuillez saisir l'identifiant et le mot de passe
                                qui vous ont été précédemment transmis.`}
              </p>
              <p>{`Pour des raisons de sécurité, le nombre de tentatives de saisie est limité.`}</p>
              <p>{`Vous disposez de 15 minutes pour vous authentifier.`}</p>
              <p>
                {`Si vous ne parvenez pas à vous authentifier, veuillez`}
                <a id="uri-assistance-1" href={`${portailUrl}/contacter-assistance`}>
                  {` contacter l'assistance.`}
                </a>
              </p>
            </div>
          </div>

          <div className="groupe panel-default" id="content">
            <div className="group-heading">Authentification</div>
            <div className="group-body">
              <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                <Typography>
                  <b>Choix du contact</b>
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Avec un identifiant</Typography>
                  <Switch onChange={handleChangeChooseType} />
                  <Typography>Parmi une liste</Typography>
                </Stack>
              </FormControl>
              <br />
              {!chooseType && (
                <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="demo-simple-text"
                    value={idSelected}
                    label="Identifiant"
                    onChange={handleChangeInput}
                  />
                </FormControl>
              )}
              {chooseType && contacts.length > 0 && (
                <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                  <InputLabel id="contact-select-label">Contact</InputLabel>
                  <Select
                    fullWidth
                    labelId="contact-select-label"
                    id="contact-select"
                    value={selected}
                    label="Contact"
                    onChange={handleChangeSelect}
                  >
                    <MenuItem disabled value="">
                      <em>Contact</em>
                    </MenuItem>
                    {contacts.map(({ lastName, firstName, function: serviceFunction }, index) => (
                      <MenuItem
                        key={`${index}-item`}
                        value={index}
                      >{`${lastName} ${firstName} - ${serviceFunction}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {(Number.isInteger(selected) || idSelected) && (
                <div className="form-group text-right">
                  <button className="button-insee" onClick={() => chooseUser(chooseType)}>
                    Connexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav id="piedPage" className="row-fluid navbar-fixed-bottom">
          <ul>
            <li>
              <a
                id="uri-assistance-2"
                title="Contacter l'assistance"
                href={`${portailUrl}/contacter-assistance`}
              >
                {`Contacter l'assistance`}
              </a>
            </li>

            <li>
              <a id="uri-accessibilite" title="Accessibilité" href={`${portailUrl}/accessibilite`}>
                Accessibilité
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
