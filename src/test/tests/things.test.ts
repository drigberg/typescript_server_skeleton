import axios from 'axios';
import { assert, expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import fixture from './things.fixture';

import type { Testdata } from './things.fixture';

const BASEURL = 'http://localhost:9002';

let testdata: Testdata | null = null;

describe('Things', () => {
  beforeEach(async () => {
    await fixture.tearDown();
    testdata = await fixture.setup();
  });

  describe('Create', () => {
    it('Succeeds', async () => {
      assert(testdata !== null, 'Testdata is not setup');

      const response = await axios.post(`${BASEURL}/api/things`, {
        name: 'Velociraptor',
        categoryId: testdata.categories[0].id,
      });

      const thing = response.data.thing;
      expect(Object.keys(thing)).to.have.same.members([
        'id',
        'categoryId',
        'name',
      ]);
      expect(Object.keys(thing)).to.have.length(3);
      expect(thing.id).to.be.a('number');
      expect(thing.categoryId).to.equal(testdata.categories[0].id);
      expect(thing.name).to.equal('Velociraptor');
    });

    it('Fails without name', async () => {
      assert(testdata !== null, 'Testdata is not setup');

      const response = await axios.post(
        `${BASEURL}/api/things`,
        {
          categoryId: 1,
        },
        { validateStatus: () => true }
      );

      expect(response.status).to.equal(400);
      expect(response.data.error).to.equal('Invalid post format');
    });
  });
});
