import { relative } from 'path';
import * as assert from 'assert';

import { testConfig } from '../root.config';
import { UserService } from '../../src/app/service/user';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');

describe(filename, () => {
  let userService: UserService;
  let userId: number;

  before(async () => {
    userService = await testConfig.app
      .getApplicationContext()
      .getAsync<UserService>(UserService);
  });

  after(async () => {
    if (userId) {
      await userService.destroy({
        id: userId,
      });
    }
  });

  it('saveNew test', async () => {
    const res = await userService.saveNew({
      firstName: '张',
      lastName: '飞',
      classroomId: 1,
    });

    assert(res, '创建失败');
    userId = res.id;
  });

  it('getUserList test', async () => {
    const userService = await testConfig.app
      .getApplicationContext()
      .getAsync<UserService>(UserService);

    const res = await userService.getUserAndClassroomAndParentList(1, 10);
    assert(res);
  });
});
