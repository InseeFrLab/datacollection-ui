import {
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { filterSurveys } from "utils/functions";

export const SmartFilter = ({ mySurveys, setSurveyFiltered, setPage }) => {
  const [filter, setFilter] = useState("");
  const [selectedSurveysFilter, setSelectedSurveysFilter] = useState([]);

  const [surveysList] = useState(
    mySurveys
      .reduce((_, { surveyWording }) => {
        if (!_.includes(surveyWording)) return [..._, surveyWording];
        return _;
      }, [])
      .sort()
  );

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeFilterSurvey = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSurveysFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    if (filter || selectedSurveysFilter) {
      const newSurveys = filterSurveys(
        [...mySurveys],
        filter,
        selectedSurveysFilter
      );

      setSurveyFiltered(newSurveys);
      setPage(0);
    } else {
      setSurveyFiltered(mySurveys);
      setPage(0);
    }
  }, [filter, selectedSurveysFilter, mySurveys, setSurveyFiltered, setPage]);

  const removeSurvey = (survey) => {
    setSelectedSurveysFilter(selectedSurveysFilter.filter((s) => s !== survey));
  };

  return (
    <Box
      sx={{
        p: 1,
        marginTop: "15px",
        marginBottom: "5px",
      }}
    >
      <Grid container spacing={2} sx={{ marginTop: "15px" }}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Enquêtes</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              variant="standard"
              label="Enquêtes"
              multiple
              value={selectedSurveysFilter}
              onChange={handleChangeFilterSurvey}
              input={
                <OutlinedInput id="select-multiple-chip" label="Enquêtes" />
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {surveysList.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={selectedSurveysFilter.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {selectedSurveysFilter.map((value) => (
              <Chip
                sx={{ m: 0.5 }}
                key={value}
                label={value}
                onDelete={() => removeSurvey(value)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <FormControl
            fullWidth
            variant="standard"
            sx={{ marginBottom: "15px", minWidth: "50%" }}
          >
            <TextField
              fullWidth
              id="filter"
              value={filter}
              label="Filtre"
              placeholder="Filtrer par UE, enquêtes ...."
              onChange={handleChangeFilter}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
