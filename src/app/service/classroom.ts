import { Provide, Inject } from '@midwayjs/decorator';

import ClassroomMapping from '../mapping/classroom';
import { CreateClassroomInput } from '../dto/class.dto';
import { Context } from '../../interface';

@Provide()
export default class ClassroomService {
  @Inject()
  ctx: Context;

  @Inject()
  classroomMapping: ClassroomMapping;

  async createClassroom(createParams: CreateClassroomInput) {
    const { prom, grade } = createParams;
    const res = await this.classroomMapping.saveNew({
      prom,
      grade,
    });

    return res;
  }

  async getList(offset: number, take: number) {
    const res = await this.classroomMapping.getList(offset, take);

    return res;
  }
}
