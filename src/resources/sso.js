import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getSso(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createSso(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getSsoRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifySsoRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteSsoRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function createSsoSaml2Acs(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/sso/saml2/acs';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

