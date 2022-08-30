import { Validate } from '@midwayjs/validate';
import {
  Inject,
  Controller,
  Query,
  Get,
  Post,
  Body,
} from '@midwayjs/decorator';
import { CreateUserInput } from '../model/dto/user';
import { QueryParamDTO } from '../model/dto/base';
import { UserService } from '../service/user';
import { BaseController } from '../../core/baseController';

@Controller('/user', { tagName: 'User', description: '用户管理控制器' })
export class UserController extends BaseController {
  @Inject()
  protected service: UserService;

  @Get('/', { summary: '分页获取用户列表' })
  @Validate()
  async index(
    @Query()
    queryParam: QueryParamDTO
  ) {
    const { page, limit } = queryParam;
    const res = await this.service.findAndCountAll(page, limit);
    return this.success(res);
  }

  @Post('/', {
    summary: '创建用户',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  @Validate()
  async create(
    @Body()
    createParams: CreateUserInput
  ) {
    const res = await this.service.create(createParams);
    return this.success(res);
  }

  @Get('/number', {
    summary: '获取用户数量',
  })
  @Validate()
  async getNumberUser() {
    const res = await this.service.getNumberUser();
    return this.success(res);
  }
}
