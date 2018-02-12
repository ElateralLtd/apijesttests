import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getAsset(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createAsset(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getAssetRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyAssetRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteAssetRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function createAssetRefAddcollaborator(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}/addcollaborator';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getAssetRefVersions(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}/versions';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function getAssetRefVersionVersion(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/asset/{ref}/version/{version}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
    REQUEST.uri = REQUEST.uri.replace('{version}', options.version);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}
