import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'classroom',
  timestamps: true,
  paranoid: true,
  indexes: [
   {
    name: "PRIMARY",
    unique: true,
    using: "BTREE",
    fields: [
     { name: "id" },
    ]
   },
  ]
})
export class ClassroomEntity extends Model {
  @Column({
   autoIncrement: true,
   type: DataType.INTEGER.UNSIGNED,
   allowNull: false,
   primaryKey: true
  })
  id: number;

  @Column({
   type: DataType.TINYINT.UNSIGNED,
   allowNull: false
  })
  grade: number;

  @Column({
   type: DataType.TINYINT.UNSIGNED,
   allowNull: false
  })
  prom: number;
}