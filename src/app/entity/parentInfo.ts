import {
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';

import { UserEntity } from './user';

@Table({
  modelName: 'parent_info',
  timestamps: true,
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
}
