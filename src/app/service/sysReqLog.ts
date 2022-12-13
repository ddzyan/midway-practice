import { Provide, Inject } from '@midwayjs/core';
import * as utils from 'happy-node-utils';

import { SysReqLogMapping } from '../mapping/sysReqlog';
import { BaseService } from '../../core/baseService';
import { SysReqLogEntity } from '../entity/sysReqLog';

@Provide()
export class SysReqLogService extends BaseService<SysReqLogEntity> {
  @Inject()
  mapping: SysReqLogMapping;

  async create(
    url: string,
    params: string,
    status: number,
    consumeTime: number,
    method: string | undefined,
    adminId: number | null
  ): Promise<void> {
    const ip = utils.getReqIP(this.ctx);
    await this.mapping.saveNew({
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
