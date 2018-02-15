import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getRoles(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/roles';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createRoles(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/roles';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getRolesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/roles/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyRolesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/roles/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteRolesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/roles/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

