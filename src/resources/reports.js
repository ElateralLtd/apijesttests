import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getReports(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reports';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createReports(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reports';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteReportsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reports/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function deleteReportsDeleteAll(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/reports/delete/all';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

