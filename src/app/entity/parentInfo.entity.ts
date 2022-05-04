import {
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

import { UserEntity } from './user.entity';

@BaseTable({
  modelName: 'parent_info',
})
export class ParentInfoEntity extends Model {
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
    type: DataType.STRING({
      length: 20,
    }),
    comment: '姓名',
  })
  username: string;

  @Column({
    type: DataType.STRING({
      length: 20,
    }),
    comment: '电话',
  })
  tel: string;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    field: 'user_id',
    comment: '用户id',
  })
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

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
