import request from 'request';
const config = require('../config.json');
export const API_BASE_URL = config.apiFQDN;
export const API_URL = `https://${API_BASE_URL}/v1`;
export const WEB_BASE_URL = config.webAppFQDN;
export const ACCOUNTS_BASE_URL = config.accountFQDN;
const fs = require('fs');

const winston = require('winston');
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: `${logDir}/requests.log`,
    }),
  ],
});

export const buildAuthHeader = (token) => ({ Authorization: `Bearer ${token}` });

export const postRequest = options =>
  new Promise((resolve, reject) => {
    logger.info('POST: %s', options.baseUrl + options.uri);
    request.post(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      const { statusCode, statusMessage } = response;
      if (statusCode < 200 || statusCode >= 300) {
        return reject(new Error(body.message || statusMessage));
      }
      return resolve(response);
    });
  });

export const putRequest = options =>
  new Promise((resolve, reject) => {
    logger.info('PUT: %s', options.baseUrl + options.uri);
    request.put(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      const { statusCode, statusMessage } = response;
      if (statusCode < 200 || statusCode >= 300) {
        return reject(new Error(body.message || statusMessage));
      }
      return resolve(response);
    });
  });

export const getRequest = options =>
  new Promise((resolve, reject) => {
    logger.info('GET: %s', options.baseUrl + options.uri);
    request.get(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      const { statusCode, statusMessage } = response;
      if (![200, 404].includes(statusCode)) {
        return reject(new Error(body.message || statusMessage));
      }
      return resolve(response);
    });
  });

export const deleteRequest = options =>
  new Promise((resolve, reject) => {
    logger.info('DELETE: %s', options.baseUrl + options.uri);
    request.delete(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      const { statusCode, statusMessage } = response;
      if (![200, 202, 204].includes(statusCode)) {
        return reject(new Error(body.message || statusMessage));
      }
      return resolve(response);
    });
  });
