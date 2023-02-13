import { Inject, Controller, Query, Get, Post, Body } from '@midwayjs/core';
import { CreateUserInputDTO } from '../model/dto/user';
import { QueryParamDTO } from '../model/dto/base';
import { UserService } from '../service/user';
import { BaseController } from '../../core/baseController';

@Controller('/user', { tagName: 'User', description: '用户管理控制器' })
export class UserController extends BaseController {
  @Inject()
  protected service: UserService;

  @Get('/', { summary: '分页获取用户列表' })
  async index(
    @Query()
    queryParam: QueryParamDTO
  ) {
    const { page, limit } = queryParam;
    const res = await this.service.getUserAndClassroomAndParentList(
      page,
      limit
    );
    return this.success(res);
  }

  @Post('/', {
    summary: '创建用户',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  async create(
    @Body()
    createParams: CreateUserInputDTO
  ) {
    const res = await this.service.saveNew(createParams);
    return this.success(res);
  }

  @Get('/number', {
    summary: '获取用户数量',
  })
  async getNumberUser() {
    const res = await this.service.getNumberUser();
    return this.success(res);
  }
}
