import axios from 'axios';
import { expect } from 'chai';
import { describe, it } from 'mocha';

const BASEURL = 'http://localhost:9002';

describe('Server', () => {
  it('Responds', async () => {
    const response = await axios.get(`${BASEURL}/api/ping`);
    expect(response.data.ping).to.equal('pong');
  });
});
