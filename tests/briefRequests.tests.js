import { createToken } from '../src/resources/oauth';
import { getAsset } from '../src/resources/asset';
import {
  getBriefRequests,
  getBriefRequestsRef,
  modifyBriefRequestsBriefRequestItemsRef,
  getBriefRequestsBriefRequestItemsRef,
} from '../src/resources/briefRequests';
import config from '../config';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {};

describe('/briefRequests', () => {
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

  test('Retrieve all assets', () => {
    const limit = 100;
    const options = { token: Test.access_token, queryString: { limit } };
    return getAsset(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(0);
        expect(response.body.results.length).toBeLessThanOrEqual(limit);
        Test.asset1Ref = response.body.results[0].ref;
        Test.asset2Ref = response.body.results[1].ref;
      });
  });

  test('Retrieve all brief requests', () => {
    const limit = 10;
    const options = { token: Test.access_token, queryString: { limit } };
    return getBriefRequests(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(0);
        expect(response.body.results.length).toBeLessThanOrEqual(limit);
        const resultsSorted = response.body.results.find(res => {
          return res.items[0].ref !== undefined;
        });
        Test.briefRequestRef = resultsSorted.ref;
      });
  });

  test('Retrieve a brief request by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestRef;
    return getBriefRequestsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        Test.briefRequestItemRef = response.body.items[0].ref;
      });
  });

  test('Retrieve a brief request item by its reference.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestItemRef;
    options.briefRequest = Test.briefRequestRef;
    return getBriefRequestsBriefRequestItemsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
      });
  });

  test('Modify a briefRequest item by its reference (assign asset).', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestItemRef;
    options.briefRequest = Test.briefRequestRef;
    options.body = { asset: Test.asset1Ref };
    return modifyBriefRequestsBriefRequestItemsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode.toString()).toMatch(/(?:200|202)/);
      });
  });

  test('Modify a briefRequest item by its reference (change asset).', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestItemRef;
    options.briefRequest = Test.briefRequestRef;
    options.body = { asset: Test.asset2Ref };
    return modifyBriefRequestsBriefRequestItemsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(202);
      });
  });

  test('Retrieve a brief request by its reference.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestRef;
    return getBriefRequestsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
      });
  });

  test('Retrieve a brief request item by its reference.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.briefRequestItemRef;
    options.briefRequest = Test.briefRequestRef;
    return getBriefRequestsBriefRequestItemsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
      });
  });
});

