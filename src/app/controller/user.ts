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
import { Context } from 'egg';

import { CreateUserInput } from '../model/dto/user.dto';
import { QueryParam } from '../model/dto/base.dto';
import UserService from '../service/user';

@Provide()
@Controller('/api', { tagName: '用户接口', description: 'User Router' })
export class UserController {
  @Inject()
  ctx: Context;

  @Inject('userService')
  userService: UserService;

  @Get('/users', { summary: '分页获取用户列表', description: '' })
  async getUser(@Query(ALL) queryParam: QueryParam) {
    const { page, limit } = queryParam;
    const users = await this.userService.getUserList(page, limit);

    this.ctx.helper.success(users);
  }

  @Post('/user/create', {
    summary: '创建用户',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  @Validate()
  async createUser(@Body(ALL) createParams: CreateUserInput) {
    const user = await this.userService.createUser(createParams);
    this.ctx.helper.success(user);
  }
}
