import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../../core/baseService';
import ClassroomMapping from '../mapping/classroom';

@Provide()
export default class ClassroomService extends BaseService {
  @Inject()
  protected mapping: ClassroomMapping;
}
