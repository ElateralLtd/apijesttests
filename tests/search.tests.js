import { createToken } from '../src/resources/oauth';
import { getMetadata } from '../src/resources/metadata';
import { getResources } from '../src/resources/resources';
import { getSearchQuery, getSearchSuggest } from '../src/resources/search';
import config from '../config';
import { getMetadataItem } from '../src/support/helper';
import { pausecomp } from '../src/support/makePause';
import assetPayLoad from '../src/payloads/assetPayload';
import { createAsset, modifyAssetRef, deleteAssetRef } from '../src/resources/asset';

import { matchers } from 'jest-json-schema';
import { getSwaggerJson } from '../src/getSwaggerJson';
expect.extend(matchers);

const Test = {};
Test.asset = {
  name: 'APITestAssetNewForSearch',
  description: 'API Test Asset - New',
  artworkType: 'Poster',
  metadata: [],
};
const images = {
  banner: { filename: 'initiative_banner.bmp' },
  thumbnail: { filename: 'initiative_thumbnail.jpg' },
  preview: { filename: 'initiative_preview.gif' },
};

describe('/search', () => {
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
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'location').ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'brand').ref);
        Test.asset.metadata.push(getMetadataItem(response.body.results, 'artwork-type', Test.asset.artworkType).ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'customer').ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'distributor').ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'content-type').ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'attribute-2').ref);
        Test.asset.metadata.push(response.body.results.find(json => json.name === 'attribute-3').ref);
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
        Test.asset.postResponseSchema = response.body.paths['/asset'].post.responses['201'].schema;
      });
  }, config.jesBeforeAllTimeout);

  test('Create an asset in New Status', () => {
    const options = { token: Test.access_token };
    options.body = assetPayLoad.assetOrphan(Test.asset.name, Test.asset.description, Test.asset.metadata);
    return createAsset(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toEqual('New');
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body).toMatchSchema(Test.asset.postResponseSchema);
        Test.assetRef = response.body.ref;
        Test.asset.updatedAt = response.body.updatedAt;
        pausecomp(10000);
      });
  });

  test('Retrieve all search items and find item in New status', () => {
    const filter = '{"type":["initiative","asset"]}';
    const term = Test.asset.name;
    const limit = 150;
    const skip = 0;
    const sort = 'date';
    const options = { token: Test.access_token, queryString: { filter, term, limit, skip, sort } };
    return getSearchQuery(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        Test.retrievedAsset = response.body.results.find((json) => { return json.ref.includes(Test.assetRef); });
        expect(Test.retrievedAsset.status).toEqual('New');
      });
  });

  test('Modify an asset item with set of images and change status to Draft', () => {
    images.banner.ref = Test.resources.find(i => i.filename === images.banner.filename).ref;
    images.thumbnail.ref = Test.resources.find(i => i.filename === images.thumbnail.filename).ref;
    images.preview.ref = Test.resources.find(i => i.filename === images.preview.filename).ref;
    Test.asset.name = 'APITestAssetDraftForSearch';
    Test.asset.description = 'API Test Asset - Draft';
    const body = assetPayLoad.assetOrphan(`${Test.asset.name}`, `${Test.asset.description}`, Test.asset.metadata);
    body.updatedAt = Test.asset.updatedAt;

    body.images = images;
    Test.images = images;

    const options = { token: Test.access_token };
    options.body = body;
    options.ref = Test.assetRef;

    return modifyAssetRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(Test.asset.name);
        expect(response.body.description).toBe(Test.asset.description);
        expect(response.body.status).toEqual('Draft');
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body).toMatchSchema(Test.asset.putResponseSchema);
        pausecomp(10000);
      });
  });

  test('Retrieve all search items and find item in Draft status', () => {
    const filter = '{"type":["initiative","asset"]}';
    const term = Test.asset.name;
    const limit = 150;
    const skip = 0;
    const sort = 'date';
    const options = { token: Test.access_token, queryString: { filter, term, limit, skip, sort } };
    return getSearchQuery(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        Test.asset = response.body.results.find((json) => { return json.ref.includes(Test.assetRef); });
        expect(Test.asset.status).toEqual('Draft');
      });
  });

  test('Retrieve all search suggestions', () => {
    const type = 'initiative';
    const term = 'qa';
    const options = { token: Test.access_token, queryString: { type, term } };
    return getSearchSuggest(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toEqual(true);
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
});

