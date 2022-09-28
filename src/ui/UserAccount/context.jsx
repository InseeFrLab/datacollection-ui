import { createContext, useContext, useEffect, useState } from "react";
import { notifDictionary } from "i18n";
import { ERROR_SEVERITY, NONE, SUCCESS_SEVERITY } from "core/constants";
import { NoAuthLogin } from "../auth/provider/noAuth";
import { useAPI, useConstCallback } from "core/hooks";
import { AppContext } from "App";

// const initialDataUser = {
//   id: null,
//   mySurveys: [],
//   account: {},
// };
export const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
  const { authType, setLoading, openNotif } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [chooseUser] = useState(authType === NONE);

  const [userId, setUserId] = useState(null);
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
    if (!userId && !chooseUser) {
      //ToDo : retrieve id from oidcToken
      // setUserId(idFromToken)
    }
    if (userId) loadUserData(userId);
  }, [userId, chooseUser, loadUserData]);

  return (
    <>
      {user && (
        <UserAccountContext.Provider value={{ user, setUser, updateAddress }}>
          {children}
        </UserAccountContext.Provider>
      )}
      {!user && chooseUser && <NoAuthLogin setId={setUserId} />}
    </>
  );
};
