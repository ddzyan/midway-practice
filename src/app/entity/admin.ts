import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'admin',
  timestamps: true,
  paranoid: true,
  indexes: [
   {
    name: "PRIMARY",
    unique: true,
    using: "BTREE",
    fields: [
     { name: "admin_id" },
    ]
   },
  ]
})
export class AdminEntity extends Model {
  @Column({
   autoIncrement: true,
   type: DataType.INTEGER,
   allowNull: false,
   primaryKey: true,
   comment: "主键",
   field: 'admin_id'
  })
  adminId: number;

  @Column({
   type: DataType.STRING(255),
   allowNull: true,
   comment: "邮箱"
  })
  account: string;

  @Column({
   type: DataType.STRING(255),
   allowNull: false,
   comment: "密码"
  })
  pwd: string;

  @Column({
   type: DataType.TINYINT,
   allowNull: false,
   defaultValue: 1,
   comment: "1:正常 -1:禁用"
  })
  status: number;
}