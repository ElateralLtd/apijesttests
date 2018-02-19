import { API_URL, WEB_BASE_URL, ACCOUNTS_BASE_URL, postRequest } from '../shared';

function getRequest(baseURL) {
  const basicToken = `Basic ${new Buffer(`${baseURL}:${baseURL}`).toString('base64')}`;
  const AUTH = {
    Authorization: basicToken,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const request = { baseUrl: `${API_URL}`, headers: AUTH, json: false };
  return request;
}

export function createToken(user, password) {
  const REQUEST = getRequest(WEB_BASE_URL);
  REQUEST.uri = '/oauth/token';
  return postRequest(
    { ...REQUEST, body: `username=${user}&password=${password}&grant_type=password` })
    .then(response => response);
}

export function createAccountsToken(user, password) {
  const REQUEST = getRequest(ACCOUNTS_BASE_URL);
  REQUEST.uri = '/oauth/token';
  return postRequest(
    { ...REQUEST, body: `username=${user}&password=${password}&grant_type=password` })
    .then(response => response);
}
