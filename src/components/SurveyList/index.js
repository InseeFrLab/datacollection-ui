import React, { useContext, useEffect } from 'react';
import { Welcome } from '../Welcome';
import { DataGrid, frFR } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { UserAccountContext } from '../UserAccount/context';
import { useAPI } from '../../utils/hooks';

const columns = [
  { field: 'surveyUnitId', headerName: 'Référence unité enquêtée', width: 200 },
  { field: 'surveyWording', headerName: "Nom de l'enquête", width: 400 },
  { field: 'monitoringDate', headerName: 'Suivi', width: 300 },
  {
    field: 'access',
    headerName: 'Accès',
    width: 30,
    renderCell: cellValues => {
      return (
        <a href={`${cellValues.row.access}`} target="_blank" rel="noreferrer">
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

  return (
    <>
      <Welcome />
      <h2>La liste des mes enquêtes à moi</h2>
      <div style={{ height: 400, width: '80%' }}>
        {user.mySurveys && (
          <DataGrid
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            rows={user.mySurveys}
            columns={columns}
            getRowId={row => row.surveyUnitId}
          />
        )}
        {!user.mySurveys && <Typography>Chargement en cours ...</Typography>}
      </div>
    </>
  );
};
