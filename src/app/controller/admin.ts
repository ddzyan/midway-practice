import {
  Inject,
  Controller,
  Provide,
  Post,
  ALL,
  Body,
} from '@midwayjs/decorator';
import { AdminService } from '@/app/service/admin';

import { BaseController } from '@/core/baseController';

import { Validate } from '@midwayjs/validate';
import { AdminLoginDTO } from '@/app/dto/admin';

@Provide()
@Controller('/admin', {
  tagName: '管理员接口',
  description: '管理员接口',
})
export class AdminController extends BaseController {
  @Inject()
  protected adminService: AdminService;

  @Validate()
  @Post('/login', { summary: '管理员登录' })
  async login(
    @Body(ALL)
    param: AdminLoginDTO
  ) {
    const res = await this.adminService.login(param);
    return this.success(res);
  }
}
