import { Provide, Inject } from '@midwayjs/decorator';

import { PrismaClient, classroom } from '@prisma/client';
import * as utils from '../comm/utils';
import { CreateClassroomInput } from '../model/dto/class.dto';

@Provide()
export default class ClassroomMapping {
  @Inject('prisma')
  prismaClient: PrismaClient;

  // 创建
  async saveNew(createParams: CreateClassroomInput): Promise<classroom> {
    const { grade, prom } = createParams;
    const res = await this.prismaClient.classroom.create({
      data: {
        grade,
        prom,
        created_at: utils.getDateNowAdd8hours(),
        updated_at: utils.getDateNowAdd8hours(),
      },
    });

    return res;
  }

  async getList(offset: number, take: number): Promise<any[]> {
    const res = await this.prismaClient.classroom.findMany({
      select: {
        grade: true,
        prom: true,
        created_at: true,
        updated_at: true,
      },
      skip: offset,
      take,
    });

    return res;
  }
}
