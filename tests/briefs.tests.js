import { createToken } from '../src/resources/oauth';
import { getMetadata } from '../src/resources/metadata';
import { getResources } from '../src/resources/resources';
import { getMe } from '../src/resources/me';
import {
  getInitiativesRefBriefConfig,
  getInitiatives,
  createInitiatives,
  getInitiativesRef,
  deleteInitiativesRef,
} from '../src/resources/initiatives';
import initiative from '../src/payloads/initiative';
import { getBriefs, createBriefs, modifyBriefsRef, deleteBriefsRef, getBriefsRef } from '../src/resources/briefs';
import briefRequestPayLoad from '../src/payloads/briefRequestsPayload';
import { getSwaggerJson } from '../src/getSwaggerJson';
import { getMetadataItem } from '../src/support/helper';
import config from '../config';

import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const Test = {
  initiative: {
    name: 'RemoveForBrief',
    description: 'Initiative for Brief Test',
    location: 'UK',
    brand: 'Ariel',
    customer: 'None',
    distributor: 'None',
    'content-type': 'POSM',
    'attribute-2': 'N/A',
    'attribute-3': 'N/A',
    metadata: [],
  },
  artwork: { name: 'Poster' },
  brief: { location: {} },
};

describe('/briefs', () => {
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
        const { name, ref, properties } = getMetadataItem(response.body.results, 'location', Test.initiative.location);
        Test.brief.location = { name, ref, properties };
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'location', Test.initiative.location).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'brand', Test.initiative.brand).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'customer', Test.initiative.customer).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'distributor', Test.initiative.distributor).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'content-type', Test.initiative['content-type']).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'attribute-2', Test.initiative['attribute-2']).ref);
        Test.initiative.metadata.push(getMetadataItem(response.body.results, 'attribute-3', Test.initiative['attribute-3']).ref);
        Test.artwork.ref = getMetadataItem(response.body.results, 'artwork-type', Test.artwork.name).ref;
        const options = { token: Test.access_token, queryString: { limit: 100 } };
        return getResources(options);
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.resources = response.body.results;
        expect(Test.resources).toEqual(expect.anything());
        Test.briefXlsFileRef = response.body.results.find(r => r.filename === 'TestBrief.xlsx').ref;

        return getMe({ token: Test.access_token });
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.anything());
        Test.me = response.body;
      })
      ;
  }, config.jesBeforeAllTimeout);

  test('Retrieve all Briefs', () => {
    const limit = 10;
    const options = { token: Test.access_token, queryString: { limit } };
    return getBriefs(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThan(0);
        expect(response.body.results.length).toBeLessThanOrEqual(limit);
      });
  });

  test('Create initiative', () => {
    const options = { token: Test.access_token };
    options.body = initiative
      .createFromTemplate(
        Test.initiative.name,
        Test.initiative.description,
        Test.me.account.ref,
        Test.initiative.metadata);

    options.body.briefTemplate = Test.briefXlsFileRef;
    options.body.properties = { brief_active: true };
    options.body.active = true;

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
        expect(Array.isArray(response.body.briefConfigs)).toEqual(true);
        expect(response.body.name).toBe(Test.initiative.name);
        expect(response.body.description).toBe(Test.initiative.description);
        expect(response.body.account).toBe(Test.me.account.ref);
        Test.initRef = response.body.ref;
      });
  });

  test('Create Brief', () => {
    const options = { token: Test.access_token };
    const properties = briefRequestPayLoad
      .createProperties(
        config.adminUser.userName,
        config.adminUser.email,
        '8-000-111-222',
        'emailCC@elateral.com',
        '0123',
        'Comments for Brief request');

    Test.briefRequestBody = briefRequestPayLoad
      .createFromTemplate(
        Test.initRef,
        Test.artwork,
        Test.brief.location,
        properties);
    Test.briefRequestBody.name = 'QAAuto_CreateBrief_Test';
    options.body = Test.briefRequestBody;

    return createBriefs(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(201);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.name).toBe(options.body.name);
        expect(response.body.account).toBe(Test.me.account.ref);
        Test.newBrief = { ref: response.body.ref, updatedAt: response.body.updatedAt };
      });
  });

  test('Retrieve Brief by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newBrief.ref;
    return getBriefsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.ref).toEqual(options.ref);
        expect(response.body.account).toBe(Test.me.account.ref);
      });
  });

  test('Modify Brief by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newBrief.ref;
    options.body = Test.briefRequestBody;
    options.body.name = 'QAAuto_CreateBrief_Test modified';
    options.body.updatedAt = Test.newBrief.updatedAt;
    return modifyBriefsRef(options)
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.statusCode).toBe(200);
        expect(response.body.updatedAt).toEqual(expect.anything());
        expect(response.body.createdAt).toEqual(expect.anything());
        expect(response.body.ref).toEqual(expect.anything());
        expect(response.body.account).toBe(Test.me.account.ref);
        expect(response.body.name).toBe(options.body.name);
      });
  });

  test('Delete Brief by reference', () => {
    const options = { token: Test.access_token };
    options.ref = Test.newBrief.ref;
    return deleteBriefsRef(options)
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

