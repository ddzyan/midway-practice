import { Provide } from '@midwayjs/decorator';

import { SysReqLogEntity } from '../entity/sysReqLog';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class SysReqLogMapping extends BaseMapping<SysReqLogEntity> {
  getModel() {
    return SysReqLogEntity;
  }
}
