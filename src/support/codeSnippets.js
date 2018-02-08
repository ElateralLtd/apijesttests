export function fileHeader() {
  return `import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../../shared';

const REQUEST = { baseUrl: API_URL, json: true };

`;
}


export function getMethod(methodName, uri) {
  return `export function ${methodName}(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '${uri}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

`;
}

export function postMethod(methodName, uri) {
  return `export function ${methodName}(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '${uri}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

`;
}

export function putMethod(methodName, uri) {
  return `export function ${methodName}(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '${uri}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return putRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

`;
}

export function deleteMethod(methodName, uri) {
  return `export function ${methodName}(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '${uri}';
  if (options.ref) {
    REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  }
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

`;
}
