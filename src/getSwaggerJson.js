import { API_URL, postRequest, getRequest, buildAuthHeader } from './shared';

const REQUEST = { baseUrl: API_URL, uri: '/api-docs', json: true };

export function getSwaggerJson() {
  return getRequest(
    { ...REQUEST })
    .then(response => response);
}
