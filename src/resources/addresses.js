import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getAddresses(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/addresses';

  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createAddresses(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/addresses';

  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getAddressesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/addresses/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyAddressesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/addresses/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteAddressesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/addresses/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

