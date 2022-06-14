import React, { useContext, useEffect, useState } from 'react';
import { useAPI, useConstCallback } from 'utils/hooks';
import { AppContext } from '../../App';
import { NONE } from '../../utils/constants';
import { NoAuthLogin } from '../auth/provider/noAuth';

// const initialDataUser = {
//   id: null,
//   mySurveys: [],
//   account: {},
// };
export const UserAccountContext = React.createContext();

export const UserAccountProvider = ({ children }) => {
  const { authType, setLoading } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [chooseUser] = useState(authType === NONE);

  const [userId, setUserId] = useState(null);
  const { getMySurveys, getContact, getContactAddress, putAddress } = useAPI();

  const loadUserData = useConstCallback(async id => {
    setLoading(true);
    const { data: account } = await getContact(id);
    const { data: mySurveys } = await getMySurveys(id);
    const { data: address } = await getContactAddress(id);
    setLoading(false);

    setUser({ id, account, mySurveys, address });
  });

  const updateAddress = async newAddress => {
    setLoading(true);
    const fakeNew = {
      countryName: 'Uganda 2',
      streetNumber: '368',
      streetName: 'Cherish Wells',
      city: 'Lake Lynn',
      zipCode: '86597-8617',
    };
    const {
      address: {
        _links: {
          self: { href: updateUrl },
        },
      },
    } = user;
    const { error } = await putAddress(updateUrl, fakeNew);
    if (!error) setUser({ ...user, address: fakeNew });
    else {
      console.log('error in put');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userId && !chooseUser) {
      //ToDo : retrieve id from oidcToken
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
