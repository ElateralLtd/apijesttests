import { API_URL, buildAuthHeader, postRequest, getRequest, putRequest, deleteRequest } from '../shared';

const REQUEST = { baseUrl: API_URL, json: true };

export function getScheduledReportUsers(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/scheduledReportUsers';
  return getRequest(
    { ...REQUEST, headers, qs: options.queryString })
    .then(response => response);
}

export function createScheduledReportUsers(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/scheduledReportUsers';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function createScheduledReportUsersBulkCreate(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/scheduledReportUsers/bulk/create';
  return postRequest(
    { ...REQUEST, headers, body: options.body })
    .then(response => response);
}

export function deleteScheduledReportUsersRef(options) {
  const headers = buildAuthHeader(options.token);
  REQUEST.uri = '/scheduledReportUsers/{ref}';
  REQUEST.uri = REQUEST.uri.replace('{ref}', options.ref);
  return deleteRequest(
    { ...REQUEST, headers })
    .then(response => response);
}

