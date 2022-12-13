import { Inject, Provide } from '@midwayjs/core';
import { QueryTypes } from 'sequelize';

import { UserMapping } from '../mapping/user';
import { BaseService } from '../../core/baseService';
import { UserEntity } from '../entity/user';

@Provide()
export class UserService extends BaseService<UserEntity> {
  @Inject()
  mapping: UserMapping;

  async getNumberUser() {
    const res = await this.mapping.queryRaw(
      'select count(1) as totalUser from user;',
      {
        type: QueryTypes.SELECT,
      }
    );
    return res[0];
  }

  async getUserAndClassroomAndParentList(page: number, limit: number) {
    const res = await this.mapping.getUserAndClassroomAndParentList(
      page,
      limit
    );

    return res;
  }

  getName() {
    return 'user';
  }
}
