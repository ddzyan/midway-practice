import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { AdminEntity } from '../entity/admin';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class AdminMapping extends BaseMapping {
  @InjectRepository(AdminEntity)
  repository: Repository<AdminEntity>;

  async findOne(where, options = {}) {
    const res = await this.repository.findOne({
      where,
      order: [['createdAt', 'desc']],
      ...options,
    });

    return res;
  }
}
