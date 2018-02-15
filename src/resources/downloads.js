import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function createDownloads(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/downloads';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

