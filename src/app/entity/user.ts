import {
  Column,
  DataType,
  HasOne,
  HasMany,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

import { BaseEntity } from '../../core/baseEntity';
import { ClassroomEntity } from './classroom';
import { ParentInfoEntity } from './parentInfo';

@Table({
  modelName: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    autoIncrement: true,
    primaryKey: true,
    comment: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING({
      length: 20,
    }),
    field: 'first_name',
    comment: '姓',
  })
  firstName: string;

  @Column({
    type: DataType.STRING({
      length: 20,
    }),
    field: 'last_name',
    comment: '名',
  })
  lastName: string;

  @ForeignKey(() => ClassroomEntity)
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    field: 'classroom_id',
    comment: '班级id',
  })
  classroomId: number;

  @HasOne(() => ClassroomEntity, { sourceKey: 'classroomId', foreignKey: 'id' })
  classroom: ClassroomEntity;

  @HasMany(() => ParentInfoEntity)
  parentInfos: ParentInfoEntity[];
}
