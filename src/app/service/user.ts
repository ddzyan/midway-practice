import { Provide } from '@midwayjs/core';
import { QueryTypes } from 'sequelize';

import { UserEntity } from '../entity/user';
import { ClassroomEntity } from '../entity/classroom';
import { ParentInfoEntity } from '../entity/parentInfo';
import { BaseService } from '../../core/baseService';

@Provide()
export class UserService extends BaseService<UserEntity> {
  getModel() {
    return UserEntity;
  }

  async getNumberUser() {
    const res = await this.queryRaw('select count(1) as totalUser from user;', {
      type: QueryTypes.SELECT,
    });
    return res[0];
  }

  async getUserAndClassroomAndParentList(
    page: number,
    limit: number
  ): Promise<{ rows: UserEntity[]; count: number }> {
    const res = await this.getModel().findAndCountAll({
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

  getName() {
    return 'user';
  }
}
