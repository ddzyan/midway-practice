import { Provide } from '@midwayjs/decorator';

import { User } from '../entity/user';
import { Classroom } from '../entity/classroom';
import { ParentInfo } from '../entity/parentInfo';
import { CreateUserInput } from '../model/dto/user.dto';
@Provide()
export default class UserMapping {
  // 获取用户列表
  async getList(
    page: number,
    limit: number
  ): Promise<{ data: User[]; count: number }> {
    const res = await User.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: [
        {
          model: Classroom,
          attributes: ['grade', 'prom'],
          required: true,
        },
        {
          model: ParentInfo,
          attributes: ['username', 'tel'],
          required: true,
        },
      ],
      limit,
      offset: (page - 1) * limit,
      logging: true,
    });

    const { rows: data, count } = res;
    return { data, count };
  }

  // 创建
  async saveNew(createParams: CreateUserInput) {
    return null;
  }
}
