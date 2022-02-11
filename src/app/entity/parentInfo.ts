// entity/photo.ts
import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';

import { BaseEntity } from './base';
import { User } from './user';

@EntityModel('parent_info')
export class ParentInfo extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '姓名',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '电话',
  })
  tel: string;

  @ManyToOne(() => User, user => user.parentInfos)
  user: User;
}
