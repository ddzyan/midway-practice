import { Provide } from '@midwayjs/core';
import * as utils from 'happy-node-utils';

import { SysReqLogEntity } from '../entity/sysReqLog';
import { BaseService } from '../../core/baseService';

@Provide()
export class SysReqLogService extends BaseService<SysReqLogEntity> {
  getModel() {
    return SysReqLogEntity;
  }

  async create(
    url: string,
    params: string,
    status: number,
    consumeTime: number,
    method: string | undefined,
    adminId: number | null
  ): Promise<void> {
    const ip = utils.getReqIP(this.ctx);
    await this.save({
      action: url,
      param: JSON.stringify(params),
      adminId: adminId || 1,
      ip,
      method: method ? method.toUpperCase() : undefined,
      status,
      consumeTime,
    });
  }
}
