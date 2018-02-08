import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getInitiatives(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createInitiatives(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getInitiativesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyInitiativesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteInitiativesRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function getInitiativesRefBriefConfig(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives/{ref}/briefconfig';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createInitiativesRefExportBriefImages(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/initiatives/{ref}/exportBriefImages';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}
