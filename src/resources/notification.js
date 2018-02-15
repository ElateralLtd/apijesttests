import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getNotification(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/notification';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createNotification(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/notification';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getNotificationRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/notification/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyNotificationRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/notification/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteNotificationRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/notification/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

