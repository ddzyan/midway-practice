// entity/photo.ts
import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from './base';
import { Classroom } from './classroom';
import { ParentInfo } from './parentInfo';

@EntityModel('user')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '姓',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '名',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '学号',
  })
  number: string;

  @OneToOne(() => Classroom)
  @JoinColumn()
  classroom: Classroom;

  @OneToMany(() => ParentInfo, parentInfo => parentInfo.user)
  parentInfos: ParentInfo[];
}
