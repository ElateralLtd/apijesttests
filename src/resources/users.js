import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getUsers(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/users';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createUsers(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/users';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getUsersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/users/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyUsersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/users/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteUsersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/users/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

