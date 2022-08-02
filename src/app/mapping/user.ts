import { Provide, Inject } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { SequelizeDataSourceManager } from '@midwayjs/sequelize';

import { UserEntity } from '../entity/user';
import { ClassroomEntity } from '../entity/classroom';
import { ParentInfoEntity } from '../entity/parentInfo';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class UserMapping extends BaseMapping<UserEntity> {
  @InjectRepository(UserEntity)
  repository: Repository<UserEntity>;

  @Inject()
  sequelizeDataSourceManager: SequelizeDataSourceManager;

  // 获取用户列表
  async getUserAndClassroomAndParentList(
    page: number,
    limit: number
  ): Promise<{ rows: UserEntity[]; count: number }> {
    const res = await this.repository.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: [
        {
          model: ClassroomEntity,
          attributes: ['grade', 'prom'],
          required: true,
        },
        {
          model: ParentInfoEntity,
          attributes: ['username', 'tel'],
          required: true,
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    const { rows, count } = res;
    return { rows, count };
  }
}
