import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getCarts(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createCarts(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getCartsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function deleteCartsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

export function getCartsCartItems(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{cart}/items';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createCartsCartItems(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{cart}/items';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function getCartsCartValidate(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{cart}/validate';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function modifyCartsCartItemsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{cart}/items/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{cart}', options.cart);
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteCartsCartItemsRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/carts/{cart}/items/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{cart}', options.cart);
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

