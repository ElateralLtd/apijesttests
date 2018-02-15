import { getSwaggerJson } from '../src/getSwaggerJson';
import { createToken } from '../src/resources/oauth';
import { getMetadata } from '../src/resources/metadata';
import { getMetadataItem } from '../src/support/helper';
import { getResources } from '../src/resources/resources';
import { getMe } from '../src/resources/me';
import { createAsset, getAssetRef, modifyAssetRef, deleteAssetRef, getAsset, getAssetRefVersions, getAssetRefVersionVersion } from '../src/resources/asset';
import config from '../config';
import assetPayLoad from '../src/payloads/assetPayload';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {};
const imagesObj = {
  banner: {},
  thumbnail: {},
  preview: {},
};
let images = [];

Test.asset = {
  name: 'QAAuto API Asset Orphan',
  description: 'QAAuto API Asset Orphan description',
  artworkType: 'Poster',
  location: 'UK',
  brand: 'Ariel',
  metadata: [],
};

describe('/assets', () => {
  beforeAll(() => {
    const user = config.adminUser.name;
    const password = config.adminUser.password;
    return getSwaggerJson()
      .then((response) => {
        Test.asset.postResponseSchema = response.body.paths['/asset'].post.responses['201'].schema;
        return createToken(user, password);
      }).then(response => {
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

        images = response.body.results.filter(r => r.mimeType.includes('image/'));
      });
  }, 20000);
  }, config.jesBeforeAllTimeout);

  test('Get assets with limits query', () => {
    const limit = 10;
    const options = { token: Test.access_token, queryString: { limit } };
    return getAsset(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(0);
        expect(response.body.results.length).toBeLessThanOrEqual(limit);
        expect(Array.isArray(response.body.results)).toBeTruthy();
        Test.assetExistRef = response.body.results[0].ref;
      });
  });

  test('Create asset for initiative by ref', () => {
    Test.asset.metadata.push(getMetadataItem(Test.metadata, 'location', Test.asset.location).ref);
    Test.asset.metadata.push(getMetadataItem(Test.metadata, 'brand', Test.asset.brand).ref);
    Test.asset.metadata.push(getMetadataItem(Test.metadata, 'artwork-type', Test.asset.artworkType).ref);

    const options = { token: Test.access_token };
    options.body = assetPayLoad.assetOrphan(
      Test.asset.name,
      Test.asset.description,
      Test.asset.metadata);

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
        expect(Array.isArray(response.body.collaborators)).toBeTruthy();
        expect(response.body.collaborators[0].username).toEqual(config.adminUser.name);
        expect(Array.isArray(response.body.versions)).toBeTruthy();
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body.description).toBe(Test.asset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        expect(response.body).toMatchSchema(Test.asset.postResponseSchema);
        Test.asset.ref = response.body.ref;
      });
  });

  test('Get created asset by ref', () => {
    const options = { token: Test.access_token, ref: Test.asset.ref };
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
        expect(Array.isArray(response.body.collaborators)).toBeTruthy();
        expect(Array.isArray(response.body.versions)).toBeTruthy();
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body.description).toBe(Test.asset.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        expect(response.body.collaborator).toBe(true);
        Test.createdAsset = response.body;
      });
  });

  test('Modify an asset item with set of images.', () => {
    imagesObj.banner.ref = imagesObj.thumbnail.ref = imagesObj.preview.ref = images[0].ref;
    imagesObj.banner.filename = imagesObj.thumbnail.filename = imagesObj.preview.filename = images[0].filename;

    const options = { token: Test.access_token };
    options.body = assetPayLoad.assetOrphan(
      `${Test.asset.name} modified 1`,
      `${Test.asset.description} modified 1`,
      Test.asset.metadata);

    delete options.body.status;
    options.body.images = imagesObj;
    Test.images = imagesObj;
    options.body.updatedAt = Test.createdAsset.updatedAt;

    options.ref = Test.asset.ref;

    return modifyAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(`${Test.asset.name} modified 1`);
        expect(response.body.description).toBe(`${Test.asset.description} modified 1`);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.createdBy).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.status).toEqual('Draft');
        expect(response.body.ref).toEqual(expect.anything());
        expect(Array.isArray(response.body.collaborators)).toBeTruthy();
        expect(Array.isArray(response.body.versions)).toBeTruthy();
        expect(response.body.currentVersion).toBe(1);
        expect(response.body.collaborators[0].username).toEqual(config.adminUser.name);
        expect(response.body.images.banner).toEqual(images[0].ref);
        expect(response.body.images.thumbnail).toEqual(images[0].ref);
        expect(response.body.images.preview).toEqual(images[0].ref);

        Test.createdAsset = response.body;
      });
  });

  test('Retrieve Asset versions list. Get 1st version.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.asset.ref;
    const id = '_id';
    return getAssetRefVersions(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        const version = response.body[0];
        expect(version.comments).toEqual(expect.anything());
        expect(version.preview).toEqual(expect.anything());
        expect(version.annotations).toEqual(expect.anything());
        expect(version[id]).toEqual(expect.anything());
        expect(version.preview.filename).toEqual(expect.anything());
        expect(version.preview.uri).toEqual(expect.anything());
        expect(version.preview.mimeType).toEqual(expect.anything());
        expect(version).toEqual(expect.anything());
        expect(Array.isArray(version.annotations)).toBeTruthy();

        Test.asset.versionRef = version[id];
      });
  });

  test('Modify an asset item with 2nd set of images.', () => {
    imagesObj.banner.ref = imagesObj.thumbnail.ref = imagesObj.preview.ref = images[1].ref;
    imagesObj.banner.filename = imagesObj.thumbnail.filename = imagesObj.preview.filename = images[1].filename;

    const options = { token: Test.access_token };
    options.body = assetPayLoad.assetOrphan(
      `${Test.asset.name} modified 2`,
      `${Test.asset.description} modified 2`,
      Test.asset.metadata);

    delete options.body.status;
    options.body.images = imagesObj;
    Test.images = imagesObj;
    options.body.updatedAt = Test.createdAsset.updatedAt;

    options.ref = Test.asset.ref;

    return modifyAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(`${Test.asset.name} modified 2`);
        expect(response.body.description).toBe(`${Test.asset.description} modified 2`);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.createdBy).toEqual(expect.anything());
        expect(response.body.start).toEqual(expect.anything());
        expect(response.body.end).toEqual(expect.anything());
        expect(response.body.activatedAt).toEqual(expect.anything());
        expect(response.body.status).toEqual('Draft');
        expect(response.body.ref).toEqual(expect.anything());
        expect(Array.isArray(response.body.collaborators)).toBeTruthy();
        expect(Array.isArray(response.body.versions)).toBeTruthy();
        expect(response.body.currentVersion).toBe(2);
        expect(response.body.collaborators[0].username).toEqual(config.adminUser.name);
        expect(response.body.collaborators[0].firstname).toEqual(config.adminUser.name);
        expect(response.body.collaborators[0].lastname).toEqual(config.adminUser.name);
        expect(response.body.collaborators[0].originator).toEqual(true);
        expect(response.body.images.banner).toEqual(images[1].ref);
        expect(response.body.images.thumbnail).toEqual(images[1].ref);
        expect(response.body.images.preview).toEqual(images[1].ref);

        const regexObj = new RegExp('#(.*)$');
        expect(regexObj.test(response.body.collaborators[0].colour.colour)).toBe(true);
      });
  });

  test('Get created asset by ref', () => {
    const options = { token: Test.access_token, ref: Test.asset.ref };
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
        expect(response.body.status).toEqual('Draft');
        expect(response.body.ref).toEqual(expect.anything());
        expect(Array.isArray(response.body.collaborators)).toBeTruthy();
        expect(Array.isArray(response.body.versions)).toBeTruthy();
        expect(response.body.versions.length).toBe(2);
        expect(response.body.name).toBe(`${Test.asset.name} modified 2`);
        expect(response.body.description).toBe(`${Test.asset.description} modified 2`);
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.metadata).toEqual(Test.asset.metadata);
        expect(response.body.collaborator).toBe(true);
        expect(response.body.collaborators[0].colour).toBeDefined();
      });
  });

  test('Retrieve Asset versions list. Get 2nd version.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.asset.ref;
    const id = '_id';
    return getAssetRefVersions(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(2);
        const version2 = response.body.find(i => i[id] !== Test.asset.versionRef);
        const version1 = response.body.find(i => i[id] === Test.asset.versionRef);
        expect(version2.comments).toEqual(expect.anything());
        expect(version2.preview).toEqual(expect.anything());
        expect(version2.annotations).toEqual(expect.anything());
        expect(version2[id]).toEqual(expect.anything());
        expect(version2.preview.filename).toEqual(images[1].filename);
        expect(version2.preview.uri).toEqual(expect.anything());
        expect(version2.preview.mimeType).toEqual(expect.anything());
        expect(version2).toEqual(expect.anything());
        expect(Array.isArray(version2.annotations)).toBeTruthy();

        Test.asset.versionRef = version2[id];
      });
  });

  test('Retrieve Asset versions by its reference.', () => {
    const options = { token: Test.access_token };
    options.ref = Test.asset.ref;
    options.version = Test.asset.versionRef;
    const id = '_id';
    return getAssetRefVersionVersion(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        const version = response.body;

        expect(version.comments).toEqual(expect.anything());
        expect(version.preview).toEqual(expect.anything());
        expect(version.annotations).toEqual(expect.anything());
        expect(version[id]).toEqual(expect.anything());
        expect(version.preview.filename).toEqual(images[1].filename);
        expect(version.preview.uri).toEqual(expect.anything());
        expect(version.preview.mimeType).toEqual(expect.anything());
        expect(version).toEqual(expect.anything());
        expect(Array.isArray(version.annotations)).toBeTruthy();
      });
  });

  test('Delete Asset by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.asset.ref;
    return deleteAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(204);
        expect(response.body).toBeUndefined();
      });
  });
});

