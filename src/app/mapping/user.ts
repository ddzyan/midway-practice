import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, user } from '@prisma/client';

import { CreateUserInput } from '../model/dto/user.dto';
@Provide()
export default class UserMapping {
  @Inject('prisma')
  prismaClient: PrismaClient;

  // 获取用户列表
  async getList(offset: number, take: number): Promise<any[]> {
    const res = await this.prismaClient.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        created_at: true,
        updated_at: true,
        classroom: {
          select: {
            grade: true,
            prom: true,
          },
        },
        parent_info: {
          select: {
            username: true,
            tel: true,
          },
        },
      },
      skip: offset,
      take,
    });

    return res;
  }

  // 创建
  async saveNew(createParams: CreateUserInput): Promise<user> {
    const { firstName, lastName, classroomId } = createParams;
    const number = Date.now().toString();
    const res = await this.prismaClient.user.create({
      data: { firstName, lastName, classroomId, number },
    });

    return res;
  }
}
