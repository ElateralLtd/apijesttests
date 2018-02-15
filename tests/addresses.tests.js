import { createToken } from '../src/resources/oauth';
import {
  createAddresses,
  getAddresses,
  getAddressesRef,
  modifyAddressesRef,
  deleteAddressesRef,
} from '../src/resources/addresses';
import addressPayload from '../src/payloads/addressPayload';
import config from '../config';

const Test = {};

describe('/addresses', () => {
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

  test('Create address', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    options.body = addressPayload.createFromTemplate(`QAAuto API Address Title ${timeStamp}`);

    return createAddresses(options)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.title).toBe(options.body.title);
        Test.address = response.body;
      });
  });

  test('Get address by Ref', () => {
    const options = { token: Test.access_token };
    options.ref = Test.address.ref;
    return getAddressesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(Test.address.title);
      });
  });

  test('Modify address by Ref', () => {
    const timeStamp = Date.now();
    const options = { token: Test.access_token };
    options.ref = Test.address.ref;
    options.body = Test.address;
    options.body.title = `QAAuto API Address New Title ${timeStamp}`;

    return modifyAddressesRef(options)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.title).toBe(options.body.title);
      });
  });

  test('Delete address by Ref', () => {
    const options = { token: Test.access_token };
    options.ref = Test.address.ref;
    return deleteAddressesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});
