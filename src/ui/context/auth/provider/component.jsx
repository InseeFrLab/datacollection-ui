import React, { useEffect, useState } from "react";
import { OIDC, NONE } from "core/constants";
import { getOidc } from "core/configuration";
import { createKeycloakOidcClient } from "core/keycloak";
import { listenActivity } from "core/events";
import { NoAuthLogin } from "./noAuth";

export const AuthContext = React.createContext();

const AuthProvider = ({ authType, children }) => {
  const dummyOidcClient = {
    isUserLoggedIn: false,
  };

  const [oidcClient, setOidcClient] = useState(() => {
    switch (authType) {
      case OIDC:
        return null;
      case NONE:
        return dummyOidcClient;
      default:
        throw new Error("NoAuthFile");
    }
  });

  useEffect(() => {
    if (authType !== OIDC) {
      return;
    }

    (async () => {
      const oidcConf = await getOidc();

      const oidcClient = await createKeycloakOidcClient({
        url: oidcConf["auth-server-url"],
        realm: oidcConf["realm"],
        clientId: oidcConf["resource"],
        evtUserActivity: listenActivity,
      });

      setOidcClient(oidcClient);
    })();
  }, [authType]);

  if (authType === NONE && !oidcClient?.isUserLoggedIn)
    return <NoAuthLogin setOidcClient={setOidcClient} />;
  if (oidcClient === null || !oidcClient?.isUserLoggedIn) oidcClient.login();
  if (oidcClient && oidcClient.isUserLoggedIn)
    return <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>;
  return null;
};

export default AuthProvider;
