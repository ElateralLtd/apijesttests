import { createToken } from '../src/resources/oauth';
import {
  createRoles,
  getRoles,
  getRolesRef,
  modifyRolesRef,
  deleteRolesRef,
} from '../src/resources/roles';
import config from '../config';

import { matchers } from 'jest-json-schema';
import { getSwaggerJson } from '../src/getSwaggerJson';
expect.extend(matchers);

const Test = {
  role: {},
};

describe('/roles', () => {
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
        Test.postResponseSchema = response.body.paths['/roles'].post.responses['201'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Create a role', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    Test.role.name = `QAAutoAPIRoleName${timeStamp}`;
    options.body = Test.role;
    return createRoles(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(Test.role.name);
        expect(response.body).toMatchSchema(Test.postResponseSchema);
        Test.newRole = response.body;
        Test.newRoleRef = response.body.ref;
      });
  });

  test('Retrieve all roles', () => {
    const options = { token: Test.access_token };
    return getRoles(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.results).toEqual(expect.anything());
      });
  });

  test('Retrieve a role by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newRoleRef;
    return getRolesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.ref).toEqual(Test.newRoleRef);
      });
  });

  test('Modify a role by its reference', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    Test.newRole.name = `QAAutoAPIModifiedRoleName${timeStamp}`;
    options.ref = Test.newRoleRef;
    options.body = Test.newRole;
    return modifyRolesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.ref).toEqual(Test.newRoleRef);
      });
  });

  test('Delete a role by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newRoleRef;
    return deleteRolesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
