import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { UserEntity } from './user';
@Table({
  tableName: 'parent_info',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [{ name: 'id' }],
    },
    {
      name: 'idx_user_id',
      using: 'BTREE',
      fields: [{ name: 'user_id' }],
    },
  ],
})
export class ParentInfoEntity extends Model {
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  tel: string;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
