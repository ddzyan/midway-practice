import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  modelName: 'sys_req_log',
  createdAt: true,
  updatedAt: true,
})
export class SysReqLogEntity extends Model {
  @Column({
    type: DataType.INTEGER({
      length: 10,
      unsigned: true,
    }),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键',
  })
  reqLogId: number;

  @Column({
    type: DataType.INTEGER({
      length: 10,
      unsigned: true,
    }),
    allowNull: false,
    comment: '用户ID',
  })
  adminId: string;

  @Column({
    type: DataType.STRING({
      length: 255,
    }),
    allowNull: false,
    comment: '请求ip地址',
  })
  ip: string;

  @Column({
    type: DataType.TEXT(),
    allowNull: false,
    comment: '请求参数',
  })
  param: string;

  @Column({
    type: DataType.STRING({
      length: 100,
    }),
    allowNull: false,
    comment: '请求路径',
  })
  action: string;

  @Column({
    type: DataType.STRING({
      length: 15,
    }),
    allowNull: false,
    comment: '请求方式',
  })
  method: string;

  @Column({
    type: DataType.INTEGER({
      length: 10,
      unsigned: true,
    }),
    allowNull: false,
    comment: '请求状态',
  })
  status: number;

  @Column({
    type: DataType.INTEGER({
      length: 10,
      unsigned: true,
    }),
    allowNull: false,
    comment: '消耗时间',
  })
  consumeTime: number;
}
