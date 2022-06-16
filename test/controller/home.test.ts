import * as assert from 'assert';
import { relative } from 'path';

import { testConfig } from '../root.config';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');
describe(filename, () => {
  it('should GET /api', async () => {
    const { httpRequest } = testConfig;
    const result = await httpRequest.get('/api');

    assert.equal(result.status, 200);
    assert.equal(result.body.data, 'Hello Midwayjs!');
  });
});
