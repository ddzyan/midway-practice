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
import { CreateUserInput } from '../dto/user';
import { QueryParamDTO } from '../dto/base';
import { UserService } from '../service/user';
import { BaseController } from '../../core/baseController';

@Provide()
@Controller('/user', { tagName: '用户接口', description: 'User Router' })
export class UserController extends BaseController {
  @Inject()
  protected service: UserService;

  @Get('/', { summary: '分页获取用户列表', description: '' })
  @Validate()
  async index(
    @Query(ALL)
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
    @Body(ALL)
    createParams: CreateUserInput
  ) {
    const res = await this.service.create(createParams);
    return this.success(res);
  }
}
