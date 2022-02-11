// entity/photo.ts
import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';

import { BaseEntity } from './base';

@EntityModel('classroom')
export class Classroom extends BaseEntity {
  @Column({
    type: 'tinyint',
    width: 3,
    comment: '年级',
  })
  grade: string;

  @Column({
    type: 'tinyint',
    width: 3,
    comment: '班级',
  })
  prom: string;
}
