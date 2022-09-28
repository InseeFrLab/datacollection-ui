import { createContext, useContext, useEffect, useState } from "react";
import { notifDictionary } from "i18n";
import { ERROR_SEVERITY, SUCCESS_SEVERITY } from "core/constants";
// import { NoAuthLogin } from "../auth/provider/noAuth";
import { useAPI, useConstCallback } from "core/hooks";
import { AppContext } from "App";
import { AuthContext } from "../auth/provider";

// const initialDataUser = {
//   id: null,
//   mySurveys: [],
//   account: {},
// };
export const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
  const { setLoading, openNotif } = useContext(AppContext);
  const { oidcUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const { getMySurveys, getContact, putAddress } = useAPI();

  const loadUserData = useConstCallback(async id => {
    setLoading(true);
    const { data: account, error: accountError } = await getContact(id);
    const { data: mySurveys, error: mySurveysError } = await getMySurveys(id);
    setLoading(false);
    if (!accountError && !mySurveysError) setUser({ id, ...account, mySurveys });
    else {
      openNotif({
        severity: ERROR_SEVERITY,
        message: notifDictionary.contactsLoadingError(id),
      });
    }
  });

  const updateAddress = async newAddress => {
    setLoading(true);
    const { error } = await putAddress(user.id, newAddress);
    if (!error) {
      openNotif({
        severity: SUCCESS_SEVERITY,
        message: notifDictionary.addressChangeConfirmation,
      });
      setUser({ ...user, address: newAddress });
    } else {
      openNotif({
        severity: ERROR_SEVERITY,
        message: notifDictionary.addressChangeError,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // For Keyloack : check if the id is "id" or something like : "preferred_username"
    if (oidcUser?.id) loadUserData(oidcUser?.id);
  }, [oidcUser?.id, loadUserData]);

  return (
    <>
      {user && (
        <UserAccountContext.Provider value={{ user, setUser, updateAddress }}>
          {children}
        </UserAccountContext.Provider>
      )}
    </>
  );
};
