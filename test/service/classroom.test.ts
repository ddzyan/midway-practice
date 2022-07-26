import { relative } from 'path';
import * as assert from 'assert';

import { testConfig } from '../root.config';
import { ClassroomService } from '../../src/app/service/classroom';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');

describe(filename, () => {
  it('should create', async () => {
    const classroomService = await testConfig.app
      .getApplicationContext()
      .getAsync<ClassroomService>(ClassroomService);

    const res = await classroomService.create({ grade: 1, prom: 2 });
    assert(res);
  });
});
