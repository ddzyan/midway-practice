import {
  Column,
  DataType,
  Model,
  HasOne,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

import { ClassroomEntity } from './classroom.entity';
import { ParentInfoEntity } from './parentInfo.entity';

@BaseTable({
  modelName: 'user',
})
export class UserEntity extends Model {
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
