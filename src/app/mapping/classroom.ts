import { Provide } from '@midwayjs/decorator';

import { Classroom } from '../entity/classroom';
import { CreateClassroomInput } from '../model/dto/class.dto';

@Provide()
export default class ClassroomMapping {
  async saveNew(createParams: CreateClassroomInput) {
    return null;
  }

  async getList(
    limit: number,
    page: number
  ): Promise<{ data: Classroom[]; count: number }> {
    const res = await Classroom.findAndCountAll({
      attributes: ['id', 'grade', 'prom', 'createdAt', 'updatedAt'],
      limit,
      offset: (page - 1) * limit,
    });

    const { rows: data, count } = res;

    return { data, count };
  }
}
