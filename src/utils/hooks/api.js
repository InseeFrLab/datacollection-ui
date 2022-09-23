import { useContext } from "react";
import { AppContext } from "App";
import { AuthContext } from "ui/auth/provider";
import { API } from "utils/api";
import { useConstCallback } from "./useConstCallback";

export const useAPI = () => {
    const oidcClient = useContext(AuthContext);
    const { apiUrl } = useContext(AppContext);

    const getFirstContacts = useConstCallback(() => API.getContacts(apiUrl)(oidcClient.accessToken));

    const getContact = useConstCallback(id => API.getContact(apiUrl)(id)(oidcClient.accessToken));

    const getMySurveys = useConstCallback(id => API.getMySurveys(apiUrl)(id)(oidcClient.accessToken));

    const getContactAddress = useConstCallback(id =>
        API.getContactAddress(apiUrl)(id)(oidcClient.accessToken),
    );

    const putAddress = useConstCallback((url, newAddress) =>
        API.putAddress(url)(newAddress)(oidcClient.accessToken),
    );

    return {
        getFirstContacts,
        getMySurveys,
        getContact,
        getContactAddress,
        putAddress,
    };
};
