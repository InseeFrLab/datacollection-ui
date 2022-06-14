import { rows, sleep } from '../mock/surveys';
import { fetcher } from './fetcher';

const putRequest = url => body => token =>
  fetcher(url, token, 'PUT', null, body);
/*
  const postRequest = (url) => (token) => (body) =>
	fetcher(url, token, "POST", body);
const deleteRequest = (url) => (token) => (body) =>
	fetcher(url, token, "DELETE", body);
*/
const getRequest = url => params => token =>
  fetcher(url, token, 'GET', params, null);

const mockGetMySurveys = apiUrl => id => async token => {
  await sleep(2000);
  return { data: rows, status: 200, statusText: 'ok', error: false };
};

const getMySurveys = apiUrl => id => async token => {
  return getRequest(`${apiUrl}/mySurveys/${id}`)(null)(token);
};

const getContacts = apiUrl => async token => {
  const params = { page: 0, size: 15 };
  return getRequest(`${apiUrl}/contacts`)(params)(token);
};

const getContact = apiUrl => id => async token => {
  return getRequest(`${apiUrl}/contacts/${id}`)(null)(token);
};

const getContactAddress = apiUrl => id => async token => {
  return getRequest(`${apiUrl}/contacts/${id}/address`)(null)(token);
};

const putAddress = url => body => async token => {
  return putRequest(url)(body)(token);
};

export const API = {
  mockGetMySurveys,
  getMySurveys,
  getContact,
  getContacts,
  getContactAddress,
  putAddress,
};
