import { Column, DataType, Model } from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

@BaseTable({
  modelName: 'classroom',
})
export class Classroom extends Model {
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
