import { Inject, Provide } from '@midwayjs/core';

import { BaseService } from '../../core/baseService';
import { ClassroomEntity } from '../entity/classroom';
import { ClassroomMapping } from '../mapping/classroom';
import { UserMapping } from '../mapping/user';

@Provide()
export class ClassroomService extends BaseService<ClassroomEntity> {
  @Inject()
  mapping: ClassroomMapping;

  @Inject()
  userMapping: UserMapping;

  async destroyClassroomAndUser(classroomId: number) {
    const t = await this.mapping.defaultDataSource.transaction();
    try {
      await this.mapping.destroy({ id: classroomId }, t);
      await this.userMapping.destroy({ classroomId }, t);
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
