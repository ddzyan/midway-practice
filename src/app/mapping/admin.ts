import { Provide } from '@midwayjs/decorator';

import { AdminEntity } from '../entity/admin';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class AdminMapping extends BaseMapping {
  protected get entity() {
    return AdminEntity;
  }
}
