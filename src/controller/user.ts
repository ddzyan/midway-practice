import {
  Inject,
  Controller,
  Provide,
  Query,
  ALL,
  Get,
  Post,
  Validate,
  Body,
} from '@midwayjs/decorator';
import { ValidationError } from 'joi';
import { Context } from 'egg';

import { CreateUserInput } from '../dto/user.dot';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api', { tagName: '用户接口', description: 'User Router' })
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/users', { summary: '分页获取用户列表' })
  async getUser(
    @Query(ALL) { offset: reqOffset, take: reqTake }
  ): Promise<IGetUserResponse> {
    const offset = Number(reqOffset ?? 0);
    const take = Number(reqTake ?? 10);
    const users = await this.userService.getUser(offset, take);
    this.ctx.logger.info(JSON.stringify(users));
    return { success: true, message: 'OK', data: users };
  }

  @Post('/user/create', {
    summary: '创建用户',
    description: '根据传入的参数创建用户',
  })
  @Validate()
  async createUser(@Body(ALL) createParams: CreateUserInput) {
    try {
      const user = await this.userService.createUser(createParams);
      return { success: true, msg: 'OK', data: user };
    } catch (error) {
      // 无效代码
      if (error instanceof ValidationError) {
        return { success: false, msg: 'Params Validation Error', data: {} };
      }
      return { success: false, msg: 'Unknown Errors', data: {} };
    }
  }
}
