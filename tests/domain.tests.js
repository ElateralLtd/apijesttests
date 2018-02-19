import { createAccountsToken } from '../src/resources/oauth';
import { getDomainCheck } from '../src/resources/domain';
import config from '../config';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {};

describe('/domain/check', () => {
  beforeAll(() => {
    const user = config.accountsUser.name;
    const password = config.accountsUser.password;
    return createAccountsToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
      });
  }, config.jesBeforeAllTimeout);

  test('Check if a subdomain is taken', () => {
    const subdomain = String(config.webAppFQDN).split('.')[0];
    const options = { token: Test.access_token, queryString: { subdomain } };
    return getDomainCheck(options)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.totalRecords).toEqual(1);
      });
  });

  test('Check if a subdomain is not taken', () => {
    const somedomain = `qaautoaccount${Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)}`;
    const options = { token: Test.access_token, queryString: { somedomain } };
    return getDomainCheck(options)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.totalRecords).toEqual(0);
      });
  });
});
