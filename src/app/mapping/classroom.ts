import { Provide } from '@midwayjs/decorator';

import { ClassroomEntity } from '../entity/classroom';
import { BaseMapping } from '../../core/baseMapping';

@Provide()
export class ClassroomMapping extends BaseMapping<ClassroomEntity> {
  getModel() {
    return ClassroomEntity;
  }
}
