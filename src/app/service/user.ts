import { Provide, Inject } from '@midwayjs/decorator';

import UserMapping from '../mapping/user';
import { CreateUserInput } from '../dto/user.dot';

@Provide()
export class UserService {
  @Inject()
  userMapping: UserMapping;

  async getUserList(offset: number, take: number) {
    const res = await this.userMapping.getList(offset, take);

    return res;
  }

  async createUser(createParams: CreateUserInput) {
    const res = await this.userMapping.create(createParams);

    return res;
  }
}
