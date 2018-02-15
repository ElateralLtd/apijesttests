import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function createTransferImport(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/transfer/import';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function createTransferExport(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/transfer/export';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

