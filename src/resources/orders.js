import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getOrders(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/orders';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createOrders(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/orders';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getOrdersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/orders/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createOrdersRefRetry(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/orders/{ref}/retry';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

