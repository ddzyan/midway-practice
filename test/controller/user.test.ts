import * as assert from 'assert';
import { relative } from 'path';

import { testConfig } from '../root.config';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');
describe(filename, () => {
  it('should GET /api/user', async () => {
    const { httpRequest } = testConfig;

    const result = await httpRequest
      .get('/api/user')
      .query({ page: 1, limit: 10 });

    assert.equal(result.status, 200);
    assert.equal(result.body.data.count, 1);
    assert.equal(result.body.data.rows.length, 1);
  });
});
