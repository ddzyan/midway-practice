import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'sys_req_log',
  timestamps: true,
  paranoid: true,
  indexes: [
   {
    name: "PRIMARY",
    unique: true,
    using: "BTREE",
    fields: [
     { name: "req_log_id" },
    ]
   },
   {
    name: "idx_admin_id",
    using: "BTREE",
    fields: [
     { name: "admin_id" },
    ]
   },
  ]
})
export class SysReqLogEntity extends Model {
  @Column({
   autoIncrement: true,
   type: DataType.INTEGER,
   allowNull: false,
   primaryKey: true,
   comment: "主键",
   field: 'req_log_id'
  })
  reqLogId: number;

  @Column({
   type: DataType.INTEGER,
   allowNull: false,
   comment: "用户id",
   field: 'admin_id'
  })
  adminId: number;

  @Column({
   type: DataType.STRING(255),
   allowNull: false,
   comment: "请求ip地址"
  })
  ip: string;

  @Column({
   type: DataType.TEXT,
   allowNull: false,
   comment: "请求参数"
  })
  param: string;

  @Column({
   type: DataType.STRING(100),
   allowNull: false,
   comment: "请求路径"
  })
  action: string;

  @Column({
   type: DataType.STRING(15),
   allowNull: false,
   comment: "请求方式"
  })
  method: string;

  @Column({
   type: DataType.INTEGER,
   allowNull: false,
   comment: "返回状态值"
  })
  status: number;

  @Column({
   type: DataType.INTEGER,
   allowNull: false,
   defaultValue: 0,
   comment: "消耗时间",
   field: 'consume_time'
  })
  consumeTime: number;
}