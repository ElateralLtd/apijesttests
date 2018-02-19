import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getBriefRequests(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createBriefRequests(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests';
  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}

export function getBriefRequestsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyBriefRequestsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteBriefRequestsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function getBriefRequestsRefItems(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{ref}/items';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createBriefRequestsRefItems(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{ref}/items';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}

export function getBriefRequestsBriefRequestItemsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{briefRequest}/items/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  REQUEST.uri = REQUEST.uri.replace('{briefRequest}', options.briefRequest);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyBriefRequestsBriefRequestItemsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/briefRequests/{briefRequest}/items/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  REQUEST.uri = REQUEST.uri.replace('{briefRequest}', options.briefRequest);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}
