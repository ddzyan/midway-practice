import {
  Inject,
  Controller,
  Provide,
  Query,
  ALL,
  Get,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/users')
  async getUser(
    @Query(ALL) { offset: reqOffset, take: reqTake }
  ): Promise<IGetUserResponse> {
    const offset = Number(reqOffset ?? 0);
    const take = Number(reqTake ?? 10);
    const users = await this.userService.getUser(offset, take);
    return { success: true, message: 'OK', data: users };
  }
}
