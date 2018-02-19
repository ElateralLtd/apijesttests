import { getSwaggerJson } from '../src/getSwaggerJson';
import { createToken } from '../src/resources/oauth';
import {
  createCarts,
  getCarts,
  getCartsRef,
  getCartsCartValidate,
  deleteCartsRef,
} from '../src/resources/carts';
import config from '../config';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {};

describe('/carts', () => {
  beforeAll(() => {
    const user = config.adminUser.name;
    const password = config.adminUser.password;
    return createToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
        return getSwaggerJson();
      })
      .then(response => {
        Test.postResponseSchema = response.body.paths['/carts'].post.responses['201'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Creare a cart', () => {
    const options = { token: Test.access_token };
    return createCarts(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.items.length).toEqual(0);
        expect(response.body).toMatchSchema(Test.postResponseSchema);
        Test.newCartRef = response.body.ref;
      });
  });

  test('Retrieve the carts for the supplied user', () => {
    const options = { token: Test.access_token };
    return getCarts(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.results).toEqual(expect.anything());
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.count).toBeGreaterThan(0);
        const newlyCreatedCart = response.body.results.filter(cart => {
          return cart.ref === Test.newCartRef;
        })[0];
        expect(newlyCreatedCart).toBeDefined();
      });
  });

  test('Retrieve a cart by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newCartRef;
    return getCartsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.ref).toEqual(Test.newCartRef);
      });
  });

  test('Validates a given cart', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newCartRef;
    return getCartsCartValidate(options)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('Delete a cart by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newCartRef;
    return deleteCartsRef(options)
      .then(response => {
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
