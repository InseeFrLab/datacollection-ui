import React, { useEffect, useState } from 'react';
import { OIDC, NONE } from 'utils/constants';
import { getOidc } from 'utils/configuration';
import { createKeycloakOidcClient } from 'utils/keycloak';
import { listenActivity } from 'utils/events';

export const AuthContext = React.createContext();

const dummyOidcClient = {
  isUserLoggedIn: true,
  accessToken: null,
  login: () => console.log('fake login'),
  logout: () => (window.location.href = '/'),
};

const AuthProvider = ({ authType, children }) => {
  const [oidcClient, setOidcClient] = useState(() => {
    switch (authType) {
      case OIDC:
        return null;
      case NONE:
        return dummyOidcClient;
      default:
        throw new Error('NoAuthFile');
    }
  });

  useEffect(() => {
    if (authType !== OIDC) {
      return;
    }

    (async () => {
      const oidcConf = await getOidc();

      const oidcClient = await createKeycloakOidcClient({
        url: oidcConf['auth-server-url'],
        realm: oidcConf['realm'],
        clientId: oidcConf['resource'],
        evtUserActivity: listenActivity,
      });

      setOidcClient(oidcClient);
    })();
  }, [authType]);

  if (oidcClient === null || !oidcClient?.isUserLoggedIn) oidcClient.login();
  if (oidcClient && oidcClient.isUserLoggedIn)
    return (
      <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
    );
  return null;
};

export default AuthProvider;
