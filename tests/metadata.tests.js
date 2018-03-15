import { createToken } from '../src/resources/oauth';
import {
  getMetadata,
  createMetadata,
  getMetadataRef,
  deleteMetadataRef,
  modifyMetadataRef,
} from '../src/resources/metadata';
import config from '../config';
import { getMetadataItem } from '../src/support/helper';

import { matchers } from 'jest-json-schema';
import { getSwaggerJson } from '../src/getSwaggerJson';
expect.extend(matchers);

const Test = {};
Test.metadata = {
  name: 'QAAutoTest MetadataCreate',
};

describe('/metadata', () => {
  beforeAll(() => {
    const user = config.adminUser.name;
    const password = config.adminUser.password;
    return createToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
        return getMetadata({ token: Test.access_token });
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.location = response.body.results.find(json => json.name === 'location').ref;
        return getSwaggerJson();
      })
      .then(response => {
        Test.postResponseSchema = response.body.paths['/metadata'].post.responses['201'].schema;
        Test.putResponseSchema = response.body.paths['/metadata/{ref}'].put.responses['200'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Create a metadata item', () => {
    const options = { token: Test.access_token };
    Test.metadata.parent = Test.location;
    options.body = Test.metadata;
    return createMetadata(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual('QAAutoTest MetadataCreate');
        expect(response.body.parent).toEqual(Test.metadata.parent);
        expect(response.body).toMatchSchema(Test.postResponseSchema);
        Test.newMetadataRef = response.body.ref;
      });
  });

  test('Retrieve a metadata item by its reference', () => {
    const populate = '';
    const select = '';
    const options = { token: Test.access_token, queryString: { populate, select } };
    options.ref = Test.newMetadataRef;
    return getMetadataRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('QAAutoTest MetadataCreate');
        expect(response.body.parent).toEqual(Test.metadata.parent);
        Test.metadata.updatedAt = response.body.updatedAt;
      });
  });

  test('Modify a metadata item by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newMetadataRef;
    Test.metadata.name = 'QAAutoTest MetadataEdit';
    options.body = Test.metadata;
    return modifyMetadataRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('QAAutoTest MetadataEdit');
        expect(response.body.parent).toEqual(Test.metadata.parent);
        expect(response.body).toMatchSchema(Test.putResponseSchema);
      });
  });

  test('Delete a metadata item by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newMetadataRef;
    return deleteMetadataRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
