import { Provide, Inject } from '@midwayjs/decorator';
import { SequelizeDataSourceManager } from '@midwayjs/sequelize';

import { BaseService } from '../../core/baseService';
import { ClassroomMapping } from '../mapping/classroom';
import { UserMapping } from '../mapping/user';

@Provide()
export class ClassroomService extends BaseService {
  @Inject()
  protected mapping: ClassroomMapping;

  @Inject()
  private sequelizeDataSourceManager: SequelizeDataSourceManager;

  @Inject()
  protected userMapping: UserMapping;

  async destroyClassroomAndUser(classroomId: number) {
    const t = await this.sequelizeDataSourceManager
      .getDataSource('default')
      .transaction();
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
