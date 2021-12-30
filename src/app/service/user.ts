import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, user } from '@prisma/client';

import { CreateUserInput } from '../dto/user.dot';

@Provide()
export class UserService {
  @Inject('prisma')
  prismaClient: PrismaClient;

  async getUser(offset: number, take: number): Promise<user[]> {
    const res = await this.prismaClient.user.findMany({
      skip: offset,
      take,
    });

    return res;
  }

  async createUser(createParams: CreateUserInput): Promise<user> {
    const res = await this.prismaClient.user.create({
      data: createParams,
    });

    return res;
  }
}
