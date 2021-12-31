import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, user } from '@prisma/client';

import { CreateUserInput } from '../dto/user.dot';
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
        classroom: {
          select: {
            grade: true,
            prom: true,
          },
        },
      },
      skip: offset,
      take,
    });

    return res;
  }

  // 创建用户
  async create(createParams: CreateUserInput): Promise<user> {
    const number = Date.now().toString();
    const res = await this.prismaClient.user.create({
      data: { ...createParams, number },
    });

    return res;
  }
}
