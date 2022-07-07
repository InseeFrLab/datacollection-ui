import { ContentPasteGo, ListAlt } from "@mui/icons-material";
import {
  Chip,
  Grid,
  Grow,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { format, isFuture } from "date-fns";
import React from "react";

export const SurveyItem = ({ survey, index }) => {
  const { surveyUnitId, surveyWording, monitoringDate /*, accessUrl*/ } =
    survey;

  const surveyOpen = isFuture(new Date(monitoringDate));

  const labelChip = surveyOpen ? "Ouverte" : "Fermée";
  const colorChip = surveyOpen ? "success" : "error";
  return (
    <Grow
      in
      style={{ transformOrigin: "0 0 0" }}
      timeout={(1 + index) * 400 < 2000 ? (1 + index) * 400 : 2000}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "100%",
          marginBottom: "15px",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <IconButton aria-label="Accéder au questionnaire">
              <ListAlt />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={7} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {surveyWording}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>{"Référence UE : "}</b>
                  {surveyUnitId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Réponse attendu avant le ${format(
                    new Date(monitoringDate),
                    "dd/MM/yyyy"
                  )}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              container
              direction="column"
              sx={{ textAlign: "right" }}
            >
              <Grid item>
                {surveyOpen && (
                  <Link
                    href="https://stromae-v2.dev.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office.dev.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Fkzqsw3qa-q-0-1647855585412"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="Accéder au questionnaire">
                      <ContentPasteGo />
                    </IconButton>
                  </Link>
                )}
                {!surveyOpen && (
                  <IconButton aria-label="Accéder au questionnaire" disabled>
                    <ContentPasteGo />
                  </IconButton>
                )}

                <Grid item>
                  <Chip label={labelChip} color={colorChip} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grow>
  );
};
