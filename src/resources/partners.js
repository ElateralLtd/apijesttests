import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getPartners(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/partners';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createPartners(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/partners';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getPartnersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/partners/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyPartnersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/partners/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deletePartnersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/partners/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

