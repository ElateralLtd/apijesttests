import { createToken } from '../src/resources/oauth';
import {
  createUsers,
  getUsers,
  getUsersRef,
  modifyUsersRef,
  deleteUsersRef,
} from '../src/resources/users';
import { getRoles } from '../src/resources/roles';
import config from '../config';

import { matchers } from 'jest-json-schema';
import { getSwaggerJson } from '../src/getSwaggerJson';
expect.extend(matchers);

const Test = {
  user: {
    firstName: 'AutoTestUserFirstName',
    lastName: 'AutoTestUserLastName',
    email: 'emailcc@qaauto.com',
    roles: [],
  },
};

describe('/users', () => {
  beforeAll(() => {
    const user = config.adminUser.name;
    const password = config.adminUser.password;
    return createToken(user, password)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
        const options = { token: Test.access_token };
        return getRoles(options);
      })
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.results).toEqual(expect.anything());
        Test.user.roles.push(response.body.results.find(json => { return json.name === 'system'; }).ref);
        return getSwaggerJson();
      })
      .then(response => {
        Test.postResponseSchema = response.body.paths['/users'].post.responses['201'].schema;
        Test.putResponseSchema = response.body.paths['/users/{ref}'].put.responses['200'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Create a user', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    Test.user.username = `QAAutoAPIUserName${timeStamp}`;
    options.body = Test.user;
    return createUsers(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.username).toEqual(Test.user.username);
        expect(response.body).toMatchSchema(Test.postResponseSchema);
        Test.newUser = response.body;
        Test.newUserRef = response.body.ref;
      });
  });

  test('Retrieve all users', () => {
    const limit = 50;
    const options = { token: Test.access_token, queryString: { limit } };
    return getUsers(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.results).toEqual(expect.anything());
      });
  });

  test('Retrieve a user by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newUserRef;
    return getUsersRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.ref).toEqual(Test.newUserRef);
      });
  });

  test('Modify a user by its reference', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    Test.newUser.username = `QAAutoAPIModifiedUserName${timeStamp}`;
    options.ref = Test.newUserRef;
    options.body = Test.newUser;
    return modifyUsersRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toEqual(Test.newUser.username);
        expect(response.body).toMatchSchema(Test.putResponseSchema);
      });
  });

  test('Delete a user by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newUserRef;
    return deleteUsersRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
