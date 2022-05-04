import { Column, DataType, Model } from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

@BaseTable({
  modelName: 'classroom',
})
export class ClassroomEntity extends Model {
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

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    comment: '创建时间',
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: string;

  @Column({
    type: DataType.DATE,
    field: 'deleted_at',
    comment: '删除时间',
  })
  deletedAt: string;
}
