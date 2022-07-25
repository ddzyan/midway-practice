import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  modelName: 'classroom',
  timestamps: true,
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
}
