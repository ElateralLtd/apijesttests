import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getBriefs(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefs';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createBriefs(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefs';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getBriefsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefs/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyBriefsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefs/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteBriefsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefs/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

