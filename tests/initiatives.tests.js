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
import { getSwaggerJson } from '../src/getSwaggerJson';
expect.extend(matchers);

const Test = {
  asset: {
    name: 'QAAuto API Asset',
    description: 'Asset for initiative',
    artworkType: 'Poster',
    metadata: [],
  },
  initiative: {
    name: 'QAAuto API test',
    description: 'Initiative without asset',
    location: 'UK',
    brand: 'Ariel',
    metadata: [],
  },
};
const images = {
  banner: { filename: 'initiative_banner.bmp' },
  thumbnail: { filename: 'initiative_thumbnail.jpg' },
  preview: { filename: 'initiative_preview.gif' },
};

const initiativesSchema = {
  type: 'object',
  required: ['name'],
};

describe('/initiatives', () => {
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

        return getSwaggerJson();
      })
      .then(response => {
        Test.initiative.postResponseSchema = response.body.paths['/initiatives'].post.responses['201'].schema;
      });
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
    Test.initiative.metadata.push(getMetadataItem(Test.metadata, 'location', Test.initiative.location).ref);
    Test.initiative.metadata.push(getMetadataItem(Test.metadata, 'brand', Test.initiative.brand).ref);
    const options = { token: Test.access_token };
    options.body = initiative
      .createFromTemplate(
        Test.initiative.name,
        Test.initiative.description,
        Test.me.account.ref,
        Test.initiative.metadata);

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
        expect(response.body.name).toBe(Test.initiative.name);
        expect(response.body.description).toBe(Test.initiative.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.initiative.metadata);
        expect(response.body).toMatchSchema(Test.initiative.postResponseSchema);
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
        expect(response.body.name).toBe(Test.initiative.name);
        expect(response.body.description).toBe(Test.initiative.description);
        expect(response.body.account).toBe(Test.me.account.ref);
      });
  });

  test('Create asset for initiative by ref', () => {
    const options = { token: Test.access_token };
    Test.asset.metadata = Test.initiative.metadata;
    Test.asset.metadata.push(getMetadataItem(Test.metadata, 'artwork-type', Test.asset.artworkType).ref);
    options.body = assetPayLoad.assetForInitiative(Test.asset.name, Test.asset.description, Test.initRef, Test.asset.metadata);
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
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body.description).toBe(Test.asset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
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
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body.description).toBe(Test.asset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        Test.asset = response.body;
      });
  });

  test('Update Asset', () => {
    images.banner.ref = Test.resources.find(i => i.filename === images.banner.filename).ref;
    images.thumbnail.ref = Test.resources.find(i => i.filename === images.thumbnail.filename).ref;
    images.preview.ref = Test.resources.find(i => i.filename === images.preview.filename).ref;

    const body = assetPayLoad
      .assetForInitiative(`${Test.asset.name} modified`, `${Test.asset.description} modified`, Test.initRef, Test.asset.metadata);
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
        expect(response.body.name).toBe(`${Test.asset.name} modified`);
        expect(response.body.description).toBe(`${Test.asset.description} modified`);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
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
        expect(response.body.metadata).toEqual(Test.asset.metadata);
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

