import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { AdminEntity } from '../entity/admin';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class AdminMapping extends BaseMapping<AdminEntity> {
  @InjectRepository(AdminEntity)
  repository: Repository<AdminEntity>;
}
