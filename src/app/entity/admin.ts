import { Column, DataType, Table, Model } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({
  modelName: 'admin',
  timestamps: true,
})
export class AdminEntity extends Model {
  @Column({
    type: DataType.INTEGER({
      length: 11,
      unsigned: true,
    }),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'admin_id',
    comment: '管理员id',
  })
  adminId: number;

  @Column({
    type: DataType.STRING(64),
    field: 'account',
    allowNull: false,
    comment: '账号信息',
  })
  account: string;

  @Column({
    type: DataType.STRING(125),
    allowNull: false,
    field: 'pwd',
    comment: '密码',
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const pwd = bcrypt.hashSync(val, salt);
      this.setDataValue('pwd', pwd);
    },
  })
  pwd: string;

  @Column({
    type: DataType.TINYINT({
      length: 2,
    }),
    field: 'status',
    allowNull: false,
    defaultValue: 1,
    comment: '状态:-1 -禁用，1-启用',
  })
  status: number;
}
