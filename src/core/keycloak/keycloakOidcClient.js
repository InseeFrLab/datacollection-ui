import Keycloak from "keycloak-js";

export const createKeycloakOidcClient = async ({ url, realm, clientId, evtUserActivity }) => {
  const keycloakInstance = new Keycloak({ url, realm, clientId });

  const isAuthenticated = await keycloakInstance
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-sso.html`,
      checkLoginIframe: false,
    })
    .catch(error => error);

  const login = async () => {
    await keycloakInstance.login({ redirectUri: window.location.href });
    return new Promise(() => {});
  };

  if (!isAuthenticated) {
    return {
      isUserLoggedIn: false,
      login,
    };
  }

  const oidcClient = {
    isUserLoggedIn: true,
    accessToken: keycloakInstance.token,
    oidcUser: await keycloakInstance.loadUserInfo(),
    logout: async ({ redirectTo }) => {
      await keycloakInstance.logout({
        redirectUri: redirectTo || window.location.origin,
      });

      return new Promise(() => {});
    },
  };

  (function callee() {
    const msBeforeExpiration = keycloakInstance.tokenParsed.exp * 1000 - Date.now();

    setTimeout(async () => {
      console.log(
        `OIDC access token will expire in ${minValiditySecond} seconds, waiting for user activity before renewing`,
      );

      await evtUserActivity();

      console.log("User activity detected. Refreshing access token now");

      const error = await keycloakInstance.updateToken(-1).then(
        () => undefined,
        error => error,
      );

      if (error) {
        console.log("Can't refresh OIDC access token, getting a new one");
        //NOTE: Never resolves
        await login();
      }

      oidcClient.accessToken = keycloakInstance.token;

      callee();
    }, msBeforeExpiration - minValiditySecond * 1000);
  })();

  return oidcClient;
};

const minValiditySecond = 25;
