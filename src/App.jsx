import { Alert, Snackbar } from "@mui/material";

import { createContext, useEffect, useMemo, useState } from "react";

import { getConfiguration } from "core/configuration";
import "./App.css";
import AuthProvider from "./ui/context/auth/provider/component";
import { Router } from "./ui/router";
import { LoaderSimple } from "./ui/shared/loader";
import { UserAccountProvider } from "./ui/context/UserAccount";

export const AppContext = createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [notif, setNotif] = useState({ open: false, severity: "info", message: "" });

  const openNotif = ({ message, severity }) => {
    setNotif({ open: true, message, severity });
  };

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotif({ open: false });
  };

  const context = useMemo(() => ({ ...configuration, setLoading, openNotif }), [configuration]);

  return (
    <>
      {configuration && (
        <AppContext.Provider value={context}>
          <AuthProvider authType={configuration.authType}>
            <UserAccountProvider>
              <Router />
            </UserAccountProvider>
          </AuthProvider>
        </AppContext.Provider>
      )}
      {isLoading && <LoaderSimple />}
      <Snackbar open={notif.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notif.severity} sx={{ width: "100%" }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
