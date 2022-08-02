import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { ClassroomEntity } from '../entity/classroom';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class ClassroomMapping extends BaseMapping {
  @InjectRepository(ClassroomEntity)
  repository: Repository<ClassroomEntity>;

  async getList(
    limit: number,
    page: number
  ): Promise<{ data: ClassroomEntity[]; count: number }> {
    const res = await this.repository.findAndCountAll({
      attributes: ['id', 'grade', 'prom', 'createdAt', 'updatedAt'],
      limit,
      offset: (page - 1) * limit,
    });

    const { rows: data, count } = res;

    return { data, count };
  }
}
