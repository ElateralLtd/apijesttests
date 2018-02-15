import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getSsoPublicInfoRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/ssoPublicInfo/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function getSsoPublicInfo(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/ssoPublicInfo';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

