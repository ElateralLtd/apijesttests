import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };
const headers = buildAuthHeader();

export function getBriefRequests(options) {
  REQUEST.uri = '/briefRequests';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createBriefRequests(options) {
  REQUEST.uri = '/briefRequests';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}

export function getBriefRequestsRef(options) {
  REQUEST.uri = '/briefRequests/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyBriefRequestsRef(options) {
  REQUEST.uri = '/briefRequests/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteBriefRequestsRef(options) {
  REQUEST.uri = '/briefRequests/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function getBriefRequestsRefItems(options) {
  REQUEST.uri = '/briefRequests/{ref}/items';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createBriefRequestsRefItems(options) {
  REQUEST.uri = '/briefRequests/{ref}/items';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.options })
    .then(response => response);
}

export function getBriefRequestsBriefRequestItemsRef(options) {
  REQUEST.uri = '/briefRequests/{briefRequest}/items/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyBriefRequestsBriefRequestItemsRef(options) {
  REQUEST.uri = '/briefRequests/{briefRequest}/items/{ref}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}
