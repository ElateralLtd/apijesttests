import { API_URL, WEB_BASE_URL, postRequest } from '../shared';

const basicToken = `Basic ${new Buffer(`${WEB_BASE_URL}:${WEB_BASE_URL}`).toString('base64')}`;
const AUTH = {
  Authorization: basicToken,
  'Content-Type': 'application/x-www-form-urlencoded',
};
const REQUEST = { baseUrl: `${API_URL}`, headers: AUTH, json: false };

export function createToken(user, password) {
  REQUEST.uri = '/oauth/token';
  return postRequest(
    { ...REQUEST, body: `username=${user}&password=${password}&grant_type=password` })
    .then(response => response);
}
