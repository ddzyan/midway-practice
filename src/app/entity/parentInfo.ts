import {
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

import { User } from './user';

@BaseTable({
  modelName: 'parent_info',
})
export class ParentInfo extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    field: 'user_id',
    comment: '用户id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
