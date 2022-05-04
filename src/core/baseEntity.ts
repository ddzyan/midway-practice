import { Column, DataType, Model } from 'sequelize-typescript';

export default class BaseEntity extends Model {
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
