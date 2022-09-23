import React, { useContext, useEffect } from "react";
import { Welcome } from "../Welcome";
import { Typography } from "@mui/material";
import { UserAccountContext } from "../UserAccount/context";
import { useAPI } from "../../utils/hooks";
import { SmartList } from "./smartList";

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
            <Typography variant="h4">Mes enquêtes</Typography>
            <div style={{ width: "90%", margin: "auto" }}>
                {user.mySurveys && user.mySurveys.length > 0 && <SmartList mySurveys={user.mySurveys} />}

                {user.mySurveys && user.mySurveys.length === 0 && (
                    <Typography>Vous n'avez aucune enquête.</Typography>
                )}
                {!user.mySurveys && <Typography>Chargement en cours ...</Typography>}
            </div>
        </>
    );
};
