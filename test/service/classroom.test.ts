import { relative } from 'path';
import * as assert from 'assert';

import { testConfig } from '../root.config';
import { ClassroomService } from '../../src/app/service/classroom';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');

describe(filename, () => {
  let classroomService: ClassroomService;
  let classroomId: number;

  after(async () => {
    if (classroomId) {
      await classroomService.destroy({
        id: classroomId,
      });
    }
  });

  it('saveNew test', async () => {
    classroomService = await testConfig.app
      .getApplicationContext()
      .getAsync<ClassroomService>(ClassroomService);

    const res = await classroomService.saveNew({ grade: 1, prom: 2 });
    assert(res);
    classroomId = res.id;
  });
});
