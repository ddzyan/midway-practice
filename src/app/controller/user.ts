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
import { UserService } from '../service/user';

@Provide()
@Controller('/api', { tagName: '用户接口', description: 'User Router' })
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/users', { summary: '分页获取用户列表', description: '' })
  async getUser(@Query(ALL) { offset: reqOffset, take: reqTake }) {
    const offset = Number(reqOffset ?? 0);
    const take = Number(reqTake ?? 10);
    const users = await this.userService.getUser(offset, take);
    this.ctx.helper.success(users);
  }

  @Post('/user/create', {
    summary: '创建用户',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  @Validate()
  async createUser(@Body(ALL) createParams: CreateUserInput) {
    try {
      const user = await this.userService.createUser(createParams);
      this.ctx.helper.success(user);
    } catch (error) {
      // 无效代码
      if (error instanceof ValidationError) {
        this.ctx.helper.error(403, 'Params Validation Error');
      }
      this.ctx.helper.error(500, 'Unknown Errors');
    }
  }
}
