import { createToken } from '../src/resources/oauth';
import { getOrders } from '../src/resources/orders';
import config from '../config';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {};

describe('/orders', () => {
  beforeAll(() => {
    const user = config.adminUser.name;
    const password = config.adminUser.password;
    return createToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
      });
  }, config.jesBeforeAllTimeout);

  test('Retrieve the orders for the supplied user', () => {
    const limit = 1;
    const options = { token: Test.access_token, queryString: { limit } };
    return getOrders(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.results).toEqual(expect.anything());
      });
  });
});

