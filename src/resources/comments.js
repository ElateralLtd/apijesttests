import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getCommentsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/comments/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createCommentsThreadCreate(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/comments/{thread}/create';
  REQUEST.uri = REQUEST.uri.replace('{thread}', options.thread);
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteCommentsThreadItemsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/comments/{thread}/items/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{thread}', options.thread);
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

