import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getAllUsers(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/all/users';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

