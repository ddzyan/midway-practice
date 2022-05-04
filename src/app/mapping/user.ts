import { Provide } from '@midwayjs/decorator';

import UserEntity from '../entity/user';
import ClassroomEntity from '../entity/classroom';
import ParentInfoEntity from '../entity/parentInfo';
import BaseMapping from '../../core/baseMapping';

@Provide()
export default class UserMapping extends BaseMapping {
  protected get entity() {
    return UserEntity;
  }

  // 获取用户列表
  async getUserAndClassroomAndParentList(
    page: number,
    limit: number
  ): Promise<{ rows: UserEntity[]; count: number }> {
    const res = await this.execSql(
      this.entity.findAndCountAll({
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
      })
    );

    const { rows, count } = res;
    return { rows, count };
  }
}
