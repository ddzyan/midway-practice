import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';

import { ClassroomEntity } from './classroom';
import { ParentInfoEntity } from './parentInfo';
@Table({
  tableName: 'user',
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
      name: 'user_classroomId_fkey',
      using: 'BTREE',
      fields: [{ name: 'classroom_id' }],
    },
  ],
})
export class UserEntity extends Model {
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
    field: 'first_name',
  })
  firstName: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: 'last_name',
  })
  lastName: string;

  @ForeignKey(() => ClassroomEntity)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'classroom_id',
  })
  classroomId: number;

  @HasOne(() => ClassroomEntity, { sourceKey: 'classroomId', foreignKey: 'id' })
  classroom: ClassroomEntity;

  @HasMany(() => ParentInfoEntity)
  parentInfos: ParentInfoEntity[];
}
