import {
  Column,
  DataType,
  Model,
  HasOne,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';

import { Classroom } from './classroom';
import { ParentInfo } from './parentInfo';

@BaseTable({
  modelName: 'user',
})
export class User extends Model {
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

  @Column({
    type: DataType.STRING({
      length: 32,
    }),
    comment: '学号',
  })
  number: string;

  @ForeignKey(() => Classroom)
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    field: 'classroom_id',
    comment: '班级id',
  })
  classroomId: number;

  @HasOne(() => Classroom, { sourceKey: 'classroomId', foreignKey: 'id' })
  classroom: Classroom;

  @HasMany(() => ParentInfo)
  parentInfos: ParentInfo[];
}
