import { Validate } from '@midwayjs/validate';
import {
  Inject,
  Controller,
  Provide,
  Query,
  ALL,
  Get,
  Post,
  Body,
} from '@midwayjs/decorator';
import { CreateUserInput } from '../dto/user.dto';
import { QueryParamDTO } from '../dto/base.dto';
import UserService from '../service/user';
import BaseController from '../core/baseController';

@Provide()
@Controller('/api/user', { tagName: '用户接口', description: 'User Router' })
export class UserController extends BaseController {
  @Inject()
  protected service: UserService;

  @Get('/', { summary: '分页获取用户列表', description: '' })
  async index(
    @Query(ALL)
    queryParam: QueryParamDTO
  ) {
    let { page, limit } = queryParam;
    page = Number(page);
    limit = Number(limit);
    const users = await this.service.findAll(page, limit);
    return users;
  }

  @Post('/', {
    summary: '创建用户',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  @Validate()
  async create(
    @Body(ALL)
    createParams: CreateUserInput
  ) {
    const user = await this.service.create(createParams);
    return user;
  }
}
