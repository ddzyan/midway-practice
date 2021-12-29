import { CreateUserInput } from '@/dto/user.dot';
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

  async createUser(createParams: CreateUserInput): Promise<User> {
    const res = await this.prismaClient.user.create({
      data: createParams,
    });

    return res;
  }
}
