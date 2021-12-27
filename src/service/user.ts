import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, User } from '@prisma/client';

@Provide()
export class UserService {
  @Inject('prisma')
  prismaClient: PrismaClient;

  async getUser(offset: number, take: number): Promise<User[]> {
    const res = await this.prismaClient.user.findMany({
      skip: offset,
      take,
    });

    return res;
  }
}
