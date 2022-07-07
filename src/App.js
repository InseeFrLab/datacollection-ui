import { createContext, useEffect, useState } from "react";
import { getConfiguration } from "utils/configuration";
import "./App.css";
import AuthProvider from "./components/auth/provider/component";
import { Router } from "./components/Router";
import { LoaderSimple } from "./components/shared/loader";
import { UserAccountProvider } from "./components/UserAccount/context";

export const AppContext = createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!configuration) {
      setLoading(true);
      const loadConfiguration = async () => {
        const configurationResponse = await getConfiguration();
        setLoading(false);
        setConfiguration(configurationResponse);
      };
      loadConfiguration();
    }
  }, [configuration]);

  return (
    <>
      {configuration && (
        <AppContext.Provider value={{ ...configuration, setLoading }}>
          <AuthProvider authType={configuration.authType}>
            <UserAccountProvider>
              <Router />
            </UserAccountProvider>
          </AuthProvider>
        </AppContext.Provider>
      )}
      {isLoading && <LoaderSimple />}
    </>
  );
};

export default App;
