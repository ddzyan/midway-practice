import { Inject, Controller, Post, Body } from '@midwayjs/decorator';

import { AdminService } from '@/app/service/admin';
import { BaseController } from '@/core/baseController';
import { Validate } from '@midwayjs/validate';
import { AdminLoginDTO } from '@/app/dto/admin';

@Controller('/admin', {
  tagName: 'Admin',
  description: '后台登录控制器',
})
export class AdminController extends BaseController {
  @Inject()
  protected adminService: AdminService;

  @Validate()
  @Post('/login', { summary: '管理员登录' })
  async login(
    @Body()
    param: AdminLoginDTO
  ) {
    const res = await this.adminService.login(param);
    return this.success(res);
  }
}
