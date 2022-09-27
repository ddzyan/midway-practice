import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { SysReqLogEntity } from '../entity/sysReqLog';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class SysReqLogMapping extends BaseMapping<SysReqLogEntity> {
  @InjectRepository(SysReqLogEntity)
  repository: Repository<SysReqLogEntity>;
}
