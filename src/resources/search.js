import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getSearchSuggest(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/search/suggest';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function getSearchQuery(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/search/query';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function getSearchBrowse(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/search/browse';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function getSearchRebuild(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/search/_rebuild';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

