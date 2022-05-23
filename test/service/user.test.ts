import { createApp, close } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import * as assert from 'assert';

import { UserService } from '../../src/app/service/user';

describe('test/controller/user.test.ts', () => {
  let app: Application;
  before(async () => {
    app = await createApp<Framework>();
  });

  after(async () => {
    await close(app);
  });

  it('should GET /api/user', async () => {
    const userService = await app
      .getApplicationContext()
      .getAsync<UserService>(UserService);

    const res = await userService.getUserList(1, 10);
    assert(res);
  });
});
