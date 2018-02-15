import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getDomainCheck(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/domain/check';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

