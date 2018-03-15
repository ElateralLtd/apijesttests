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
    const user = config.agencyUser.name;
    const password = config.agencyUser.password;
    return createToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
      });
  }, config.jesBeforeAllTimeout);

  test('Retrieve brief requests submitted to the agency this user represents', () => {
    const agency = true;
    const limit = 2;
    const skip = 0;
    const sort = '-createdAt';
    const options = { token: Test.access_token, queryString: { agency, limit, skip, sort } };
    return getBriefRequests(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(1);
        expect(response.body.count).toBeGreaterThan(2);
        expect(response.body.results.length).toEqual(limit);
      });
  });
});

