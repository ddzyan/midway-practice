import { Provide, Inject } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { SequelizeDataSourceManager } from '@midwayjs/sequelize';
import { UserEntity } from '../entity/user';
import { ClassroomEntity } from '../entity/classroom';
import { ParentInfoEntity } from '../entity/parentInfo';
import { BaseMapping } from '@/core/baseMapping';

@Provide()
export class UserMapping extends BaseMapping {
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

  async destroy(where, options = {}) {
    const res = await this.repository.destroy({
      where,
      ...options,
    });

    return res;
  }

  async queryRaw(sqlStr: string, option?: any) {
    const res = await this.sequelizeDataSourceManager
      .getDataSource('default')
      .query(sqlStr, option);
    return res;
  }

  async findAndCountAll(page: number, limit: number, where = {}) {
    const offset = (page - 1) * limit;

    try {
      const res = await this.repository.findAndCountAll({
        where,
        limit,
        offset: offset > 0 ? offset : 0,
        order: [['createdAt', 'desc']],
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
