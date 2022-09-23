import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { chunkArray } from "core/functions";
import { SmartFilter } from "./filter";
import { SurveyItem } from "./item";

export const SmartList = ({ mySurveys }) => {
    const [surveyFilterd, setSurveyFiltered] = useState(mySurveys);
    const [page, setPage] = useState(0);

    const surveysInPage = chunkArray([...surveyFilterd], 5);

    const nextPage = () => {
        if (page < surveysInPage.length - 1) setPage(page + 1);
    };
    const previousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <div>
            <SmartFilter mySurveys={mySurveys} setSurveyFiltered={setSurveyFiltered} setPage={setPage} />
            <Divider />
            <br />
            {surveysInPage.length > page &&
                surveysInPage[page].map((survey, index) => (
                    <SurveyItem survey={survey} key={`item-${index}`} index={index} />
                ))}
            <Box sx={{ right: 0, position: "relative" }}>
                <IconButton onClick={previousPage} disabled={!(page > 0)}>
                    <NavigateBefore />
                </IconButton>
                <IconButton onClick={nextPage} disabled={!(page < surveysInPage.length - 1)}>
                    <NavigateNext />
                </IconButton>
                <Typography>
                    {`Page `} <b>{surveysInPage.length > 0 ? page + 1 : 0}</b>
                    {` / ${surveysInPage.length}`}
                </Typography>
            </Box>
        </div>
    );
};
