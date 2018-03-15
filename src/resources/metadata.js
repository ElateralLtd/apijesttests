import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getMetadata(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/metadata';
  return getRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function createMetadata(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/metadata';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getMetadataRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/metadata/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyMetadataRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/metadata/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteMetadataRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/metadata/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}
