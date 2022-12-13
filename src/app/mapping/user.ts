import { Provide } from '@midwayjs/decorator';

import { UserEntity } from '../entity/user';
import { BaseMapping } from '../../core/baseMapping';
import { Page } from '../comm/page';
import { ClassroomEntity } from '../entity/classroom';
import { ParentInfoEntity } from '../entity/parentInfo';

@Provide()
export class UserMapping extends BaseMapping<UserEntity> {
  getModel() {
    return UserEntity;
  }

  async getUserAndClassroomAndParentList(
    page: number,
    limit: number
  ): Promise<Page<UserEntity>> {
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
    return Page.build<UserEntity>(rows, count);
  }
}
