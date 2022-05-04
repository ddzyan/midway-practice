import { Provide } from '@midwayjs/decorator';

import { ClassroomEntity } from '../entity/classroom.entity';
import BaseMapping from '../core/baseMapping';

@Provide()
export default class ClassroomMapping extends BaseMapping {
  protected get entity() {
    return ClassroomEntity;
  }

  async getList(
    limit: number,
    page: number
  ): Promise<{ data: ClassroomEntity[]; count: number }> {
    const res = await this.execSql(
      this.entity.findAndCountAll({
        attributes: ['id', 'grade', 'prom', 'createdAt', 'updatedAt'],
        limit,
        offset: (page - 1) * limit,
      })
    );

    const { rows: data, count } = res;

    return { data, count };
  }
}
