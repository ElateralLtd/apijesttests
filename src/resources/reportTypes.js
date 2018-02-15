import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getReportTypes(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reportTypes';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createReportTypes(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reportTypes';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteReportTypesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reportTypes/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

