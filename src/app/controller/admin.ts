import { Inject, Controller, Post, Body } from '@midwayjs/core';

import { AdminService } from '../../app/service/admin';
import { BaseController } from '../../core/baseController';
import { AdminLoginDTO } from '../../app/model/dto/admin';

@Controller('/admin', {
  tagName: 'Admin',
  description: '后台登录控制器',
})
export class AdminController extends BaseController {
  @Inject()
  protected service: AdminService;

  @Post('/login', { summary: '管理员登录' })
  async login(
    @Body()
    param: AdminLoginDTO
  ) {
    const res = await this.service.login(param);
    return this.success(res);
  }
}
