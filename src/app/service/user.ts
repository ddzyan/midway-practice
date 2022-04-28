import { Provide, Inject } from '@midwayjs/decorator';

import UserMapping from '../mapping/user';
import { CreateUserInput } from '../model/dto/user.dto';
import { Context } from '../../interface';

@Provide()
export default class UserService {
  @Inject()
  ctx: Context;

  @Inject()
  userMapping: UserMapping;

  async getUserList(
    page: number,
    limit: number
  ): Promise<{ data: any[]; count: number }> {
    const res = await this.userMapping.getList(page, limit);
    console.log('res', res);

    return { ...res };
  }

  async createUser(createParams: CreateUserInput) {
    const { firstName, lastName, classroomId } = createParams;
    const res = await this.userMapping.saveNew({
      firstName,
      lastName,
      classroomId,
    });

    return res;
  }
}
