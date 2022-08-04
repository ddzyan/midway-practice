import { relative } from 'path';
import * as assert from 'assert';

import { testConfig } from '../root.config';
import { UserService } from '../../src/app/service/user';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');

describe(filename, () => {
  it('should getUserList', async () => {
    const userService = await testConfig.app
      .getApplicationContext()
      .getAsync<UserService>(UserService);

    const res = await userService.getUserList(1, 10);
    assert(res);
  });
});
