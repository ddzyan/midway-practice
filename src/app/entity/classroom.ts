import { Column, DataType } from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

import BaseEntity from '../../core/baseEntity';

@BaseTable({
  modelName: 'classroom',
})
export default class ClassroomEntity extends BaseEntity {
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    autoIncrement: true,
    primaryKey: true,
    comment: '年级',
  })
  id: number;

  @Column({
    type: DataType.TINYINT({
      length: 3,
      unsigned: true,
    }),
    comment: '年级',
  })
  grade: number;

  @Column({
    type: DataType.TINYINT({
      length: 3,
      unsigned: true,
    }),
    comment: '班级',
  })
  prom: number;
}
