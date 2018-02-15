import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getResources(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources';

  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createResources(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources';

  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}

export function getResourcesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyResourcesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteResourcesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function getResourcesUploadSignature(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources/upload/signature';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createResourcesUploadDone(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/resources/upload/done';
  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}
