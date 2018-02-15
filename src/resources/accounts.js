import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getAccounts(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/accounts';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createAccounts(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/accounts';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getAccountsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/accounts/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyAccountsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/accounts/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteAccountsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/accounts/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

