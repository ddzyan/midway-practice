import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import { User } from '../entity/user';
import { CreateUserInput } from '../model/dto/user.dto';
@Provide()
export default class UserMapping {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  // 获取用户列表
  async getList(
    offset: number,
    take: number
  ): Promise<{ data: User[]; count: number }> {
    const res = await this.userModel.findAndCount({
      select: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          classroom: 'user.classroom',
          parentInfo: 'user.parentInfos',
        },
      },
      skip: offset - 1,
      take,
    });

    const [data, count] = res;
    return { data, count };
  }

  // 创建
  async saveNew(createParams: CreateUserInput) {
    return null;
  }
}
