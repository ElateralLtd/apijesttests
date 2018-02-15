import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getColour(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/colour';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createColour(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/colour';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getColourRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/colour/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyColourRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/colour/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteColourRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/colour/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

