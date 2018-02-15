import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getAudit(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/audit';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createAudit(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/audit';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getAuditRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/audit/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyAuditRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/audit/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteAuditRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/audit/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

