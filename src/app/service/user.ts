import { Provide, Inject } from '@midwayjs/decorator';
import { QueryTypes } from 'sequelize';

import { UserMapping } from '../mapping/user';
import { BaseService } from '../../core/baseService';

@Provide()
export class UserService extends BaseService {
  @Inject()
  protected mapping: UserMapping;

  async getUserList(
    page: number,
    limit: number
  ): Promise<{ rows: any[]; count: number }> {
    const res = await this.mapping.getUserAndClassroomAndParentList(
      page,
      limit
    );

    return res;
  }

  async getNumberUser() {
    const res = await this.mapping.queryRaw(
      'select count(1) as totalUser from user;',
      { type: QueryTypes.SELECT }
    );
    return res[0];
  }

  getName() {
    return 'user';
  }
}
