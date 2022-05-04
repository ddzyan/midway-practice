import { Provide, Inject } from '@midwayjs/decorator';

import UserMapping from '../mapping/user';
import { BaseService } from '../../core/baseService';

@Provide()
export default class UserService extends BaseService {
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
}
