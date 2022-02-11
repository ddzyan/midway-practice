import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import { Classroom } from '../entity/classroom';
import { CreateClassroomInput } from '../model/dto/class.dto';

@Provide()
export default class ClassroomMapping {
  @InjectEntityModel(Classroom)
  classroomModel: Repository<Classroom>;

  async saveNew(createParams: CreateClassroomInput) {
    return null;
  }

  async getList(
    offset: number,
    take: number
  ): Promise<{ data: Classroom[]; count: number }> {
    const res = await this.classroomModel.findAndCount({
      select: ['id', 'grade', 'prom', 'createdAt', 'updatedAt'],
      skip: offset - 1,
      take,
    });
    const [data, count] = res;
    return { data, count };
  }
}
