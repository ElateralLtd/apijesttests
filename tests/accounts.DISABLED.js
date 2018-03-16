import { createToken, createAccountsToken } from '../src/resources/oauth';
import {
  createAccounts,
  getAccounts,
  getAccountsRef,
  modifyAccountsRef,
  deleteAccountsRef,
} from '../src/resources/accounts';
import config from '../config';
import accountPayload from '../src/payloads/accountPayload';
import { pausecomp } from '../src/support/makePause';

import { matchers } from 'jest-json-schema';
import { getSwaggerJson } from '../src/getSwaggerJson';
import { getMe } from '../src/resources/me';
expect.extend(matchers);

const Test = {
  account: {},
  me: {},
};

describe('/accounts', () => {
  beforeAll(() => {
    const adminUser = config.adminUser.name;
    const adminUserPassword = config.adminUser.password;
    return createToken(adminUser, adminUserPassword)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.admin_user_access_token = JSON.parse(response.body).access_token;
        expect(Test.admin_user_access_token).toEqual(JSON.parse(response.body).access_token);
        return getMe({ token: Test.admin_user_access_token });
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.me.accountRef = response.body.account.ref;
        const user = config.accountsUser.name;
        const password = config.accountsUser.password;
        return createAccountsToken(user, password);
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.access_token = JSON.parse(response.body).access_token;
        expect(Test.access_token).toEqual(JSON.parse(response.body).access_token);
        return getSwaggerJson();
      })
      .then(response => {
        Test.postResponseSchema = response.body.paths['/accounts'].post.responses['201'].schema;
        Test.putResponseSchema = response.body.paths['/accounts/{ref}'].put.responses['200'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Create an account', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    Test.account.name = `QAAutoAPIAccountName${timeStamp}`;
    Test.account.secret = `QAAutoAPIAccountName${timeStamp}`;
    Test.currentAccountName = config.webAppFQDN.split('.')[0];
    Test.account.fqdn = config.webAppFQDN.replace(Test.currentAccountName, Test.account.name);
    options.body = accountPayload.createFromTemplate(
      Test.account.name,
      Test.account.fqdn,
      Test.account.secret);
    return createAccounts(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(Test.account.name);
        expect(response.body).toMatchSchema(Test.postResponseSchema);
        Test.newAccountRef = response.body.ref;
        Test.account.updatedAt = response.body.updatedAt;
      });
  });

  test('Retrieve all accounts', () => {
    const limit = 100;
    const options = { token: Test.access_token, queryString: { limit } };
    return getAccounts(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toEqual(expect.anything());
        expect(response.body.results).toEqual(expect.anything());
        Test.searchedAccount = response.body.results.filter(account => {
          return account.ref === Test.me.accountRef;
        })[0];
        expect(Test.searchedAccount).toEqual(expect.anything());
      });
  });

  test('Retrieve created account', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newAccountRef;
    return getAccountsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(Test.account.name);
      });
  });

  test('Modify a account by its reference', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    options.ref = Test.newAccountRef;
    Test.account.newName = `NEW${Test.account.name}`;
    options.body = accountPayload.createFromTemplate(
      Test.account.newName,
      Test.account.fqdn,
      Test.account.secret);
    options.body.updatedAt = Test.account.updatedAt;
    return modifyAccountsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSchema(Test.putResponseSchema);
        pausecomp(40000);
      });
  });

  test('Delete a account by its reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newAccountRef;
    return deleteAccountsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
