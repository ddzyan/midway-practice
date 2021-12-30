import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, user } from '@prisma/client';

import { CreateUserInput } from '../dto/user.dot';
@Provide()
export default class UserMapping {
  @Inject('prisma')
  prismaClient: PrismaClient;
  async getList(offset: number, take: number): Promise<user[]> {
    const res = await this.prismaClient.user.findMany({
      skip: offset,
      take,
    });

    return res;
  }

  async create(createParams: CreateUserInput): Promise<user> {
    const res = await this.prismaClient.user.create({
      data: createParams,
    });

    return res;
  }
}
