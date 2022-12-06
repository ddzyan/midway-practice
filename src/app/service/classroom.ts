import { Provide } from '@midwayjs/core';

import { ClassroomEntity } from '../entity/classroom';
import { BaseService } from '../../core/baseService';

@Provide()
export class ClassroomService extends BaseService<ClassroomEntity> {
  getModel() {
    return ClassroomEntity;
  }

  async destroyClassroomAndUser(classroomId: number) {
    const t = await this.defaultDataSource.transaction();
    try {
      await this.destroy({ id: classroomId }, t);
      await this.destroy({ classroomId }, t);
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
