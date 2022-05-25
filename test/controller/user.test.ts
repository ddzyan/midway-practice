import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import * as assert from 'assert';

describe.skip('test/controller/user.test.ts', () => {
  let app: Application;
  before(async () => {
    app = await createApp<Framework>();
  });

  after(async () => {
    await close(app, { sleep: 0 });
    console.log('user close');
  });

  it('should GET /api/user', async () => {
    const result = await createHttpRequest(app)
      .get('/api/user')
      .query({ page: 1, limit: 10 });

    assert.equal(result.status, 200);
    assert.equal(result.body.data.count, 1);
    assert.equal(result.body.data.rows.length, 1);
  });
});
