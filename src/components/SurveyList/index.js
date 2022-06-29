import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { Welcome } from "../Welcome";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { UserAccountContext } from "../UserAccount/context";
import { useAPI } from "../../utils/hooks";

const columns = [
  { field: "surveyUnitId", headerName: "Référence unité enquêtée", width: 200 },
  { field: "surveyWording", headerName: "Nom de l'enquête", width: 400 },
  {
    field: "monitoringDate",
    headerName: "Suivi",
    width: 300,
    renderCell: (cellValues) => {
      return (
        <span>{`Réponse attendu avant le ${format(
          new Date(cellValues.row.monitoringDate),
          "dd/MM/yyyy à HH:mm:ss"
        )}`}</span>
      );
    },
  },
  {
    field: "accessUrl",
    headerName: "Accès",
    width: 30,
    renderCell: (cellValues) => {
      return (
        <a
          href={`https://stromae-v2.dev.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office.dev.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Fkzqsw3qa-q-0-1647855585412`}
          target="_blank"
          rel="noreferrer"
        >
          Lien
        </a>
      );
    },
  },
];

export const SurveyList = () => {
  const { user, setUser } = useContext(UserAccountContext);
  const { getMySurveys } = useAPI();

  useEffect(() => {
    const load = async () => {
      const { data, error } = await getMySurveys(user.id);
      if (!error) {
        setUser({ ...user, mySurveys: data });
      }
    };
    if (!user.mySurveys) load();
  }, [getMySurveys, setUser, user, user.mySurveys]);

  console.log(user.mySurveys);
  return (
    <>
      <Welcome />
      <Typography variant="h4">La liste des mes enquêtes à moi</Typography>
      <div style={{ height: 400, width: "80%", margin: "auto" }}>
        {user.mySurveys && user.mySurveys.length > 0 && (
          <DataGrid
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            rows={user.mySurveys}
            columns={columns}
            getRowId={(row) => row.surveyUnitId}
          />
        )}
        {user.mySurveys && user.mySurveys.length === 0 && (
          <Typography>Vous n'avez aucune enquête.</Typography>
        )}
        {!user.mySurveys && <Typography>Chargement en cours ...</Typography>}
      </div>
    </>
  );
};
