import { Alert, Card, Divider, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
  const [notif, setNotif] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  const openNotif = ({ message, severity }) => {
    setNotif({ open: false, message, severity });
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

  return (
    <>
      {configuration && (
        <AppContext.Provider
          value={{ ...configuration, setLoading, openNotif }}
        >
          <AuthProvider authType={configuration.authType}>
            <UserAccountProvider>
              <Router />
            </UserAccountProvider>
          </AuthProvider>
        </AppContext.Provider>
      )}
      {isLoading && <LoaderSimple />}
      <Snackbar open={notif.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={notif.severity}
          sx={{ width: "100%" }}
        >
          {notif.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
