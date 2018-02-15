import { createToken } from '../src/resources/oauth';
import { getMetadata } from '../src/resources/metadata';
import { getResources } from '../src/resources/resources';
import {
  getInitiativesRefBriefConfig,
  getInitiatives,
  createInitiatives,
  getInitiativesRef,
  deleteInitiativesRef,
} from '../src/resources/initiatives';
import { getMe } from '../src/resources/me';
import config from '../config';
import { getMetadataItem } from '../src/support/helper';
import initiative from '../src/payloads/initiative';
import assetPayLoad from '../src/payloads/assetPayload';
import { createAsset, getAssetRef, modifyAssetRef, deleteAssetRef } from '../src/resources/asset';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const user = config.adminUser.name;
const password = config.adminUser.password;
const Test = {};
const images = {
  banner: { filename: 'initiative_banner.bmp' },
  thumbnail: { filename: 'initiative_thumbnail.jpg' },
  preview: { filename: 'initiative_preview.gif' },
};

const testInitiative = {
  name: 'QAAuto API test',
  description: 'Initiative without asset',
  location: 'UK',
  brand: 'Ariel',
  metadata: [],
};

const testAsset = {
  name: 'QAAuto API Asset',
  description: 'Asset for initiative',
  artworkType: 'Poster',
  metadata: [],
};

const initiativesSchema = {
  type: 'object',
  required: ['name'],
};

describe('/initiatives', () => {
  beforeAll(() => {
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
        Test.metadata = response.body.results;
        return getMe({ token: Test.access_token });
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.me = response.body;
        const options = { token: Test.access_token, queryString: { limit: 100 } };
        return getResources(options);
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.resources = response.body.results;
        expect(Test.resources).toEqual(expect.anything());
      });
  }, 20000);
  }, config.jesBeforeAllTimeout);

  test('Get initiatives', () => {
    const limit = 10;
    const options = { token: Test.access_token, queryString: { limit } };
    return getInitiatives(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(0);
        expect(response.body.results.length).toBeLessThanOrEqual(limit);
      });
  });

  test('Create initiative', () => {
    testInitiative.metadata.push(getMetadataItem(Test.metadata, 'location', testInitiative.location).ref);
    testInitiative.metadata.push(getMetadataItem(Test.metadata, 'brand', testInitiative.brand).ref);
    const options = { token: Test.access_token };
    options.body = initiative
      .createFromTemplate(
      testInitiative.name,
      testInitiative.description,
      Test.me.account.ref,
      testInitiative.metadata);

    return createInitiatives(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.active).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.briefImages).toEqual([]);
        expect(response.body.briefConfigs).toEqual([]);
        expect(response.body.name).toBe(testInitiative.name);
        expect(response.body.description).toBe(testInitiative.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(testInitiative.metadata);
        expect(response.body).toMatchSchema(initiativesSchema);
        Test.initRef = response.body.ref;
      });
  });

  test('Get initiatives by ref', () => {
    const options = { token: Test.access_token };
    options.ref = Test.initRef;
    return getInitiativesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(testInitiative.name);
        expect(response.body.description).toBe(testInitiative.description);
        expect(response.body.account).toBe(Test.me.account.ref);
      });
  });

  test('Create asset for initiative by ref', () => {
    const options = { token: Test.access_token };
    testAsset.metadata = testInitiative.metadata;
    testAsset.metadata.push(getMetadataItem(Test.metadata, 'artwork-type', testAsset.artworkType).ref);
    options.body = assetPayLoad.assetForInitiative(testAsset.name, testAsset.description, Test.initRef, testAsset.metadata);
    return createAsset(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.createdBy).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.status).toEqual('New');
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.collaborators.length).toBeGreaterThan(0);
        expect(response.body.versions).toEqual([]);
        expect(response.body.name).toBe(testAsset.name);
        expect(response.body.description).toBe(testAsset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(testAsset.metadata);
        Test.assetRef = response.body.ref;
      });
  });

  test('Get created asset by ref', () => {
    const options = { token: Test.access_token };
    options.ref = Test.assetRef;
    return getAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.createdBy).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.status).toEqual('New');
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.collaborators.length).toBeGreaterThan(0);
        expect(response.body.versions).toEqual([]);
        expect(response.body.name).toBe(testAsset.name);
        expect(response.body.description).toBe(testAsset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(testAsset.metadata);
        Test.asset = response.body;
      });
  });

  test('Update Asset', () => {
    images.banner.ref = Test.resources.find(i => i.filename === images.banner.filename).ref;
    images.thumbnail.ref = Test.resources.find(i => i.filename === images.thumbnail.filename).ref;
    images.preview.ref = Test.resources.find(i => i.filename === images.preview.filename).ref;

    const body = assetPayLoad
      .assetForInitiative(`${testAsset.name} modified`, `${testAsset.description} modified`, Test.initRef, testAsset.metadata);
    body.images = images;
    Test.images = images;
    body.updatedAt = Test.asset.updatedAt;

    const options = { token: Test.access_token };
    options.body = body;
    options.ref = Test.assetRef;

    return modifyAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(`${testAsset.name} modified`);
        expect(response.body.description).toBe(`${testAsset.description} modified`);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(testAsset.metadata);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.createdBy).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.status).toEqual('New');
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.collaborators.length).toBeGreaterThan(0);
      }
      );
  });

  test('Get updated Asset by ref and check images', () => {
    const options = { token: Test.access_token };
    options.ref = Test.assetRef;
    return getAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(testAsset.metadata);
        expect(response.body.images.preview).toEqual(Test.images.preview.ref);
        expect(response.body.images.banner).toEqual(Test.images.banner.ref);
        expect(response.body.images.thumbnail).toEqual(Test.images.thumbnail.ref);
      });
  });

  test('Get briefConfig of initiative', () => {
    const options = { token: Test.access_token };
    options.ref = Test.assetRef;
    return getInitiativesRefBriefConfig(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(404);
      });
  });

  test('Delete Asset by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.assetRef;
    return deleteAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });

  test('Delete Initiative by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.initRef;
    return deleteInitiativesRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});

