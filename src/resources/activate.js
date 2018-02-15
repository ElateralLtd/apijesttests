import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function createActivate(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/activate';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

