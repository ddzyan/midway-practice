import {
  Inject,
  Controller,
  Post,
  Body,
  Get,
  Query,
  ALL,
} from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { LoginImageCaptchaDto } from '../../../model/dto/verify';

import {
  BaseController,
  ADMIN_PREFIX_URL,
  NOAUTH_PREFIX_URL,
} from '../../../../core/baseController';
import { AdminLoginDTO } from '../../../../app/model/dto/admin';
import { AdminVerifyService } from '../../../../app/service/admin/verify';

@Controller(`${ADMIN_PREFIX_URL}/${NOAUTH_PREFIX_URL}`, {
  tagName: 'AdminLogin',
  description: '后台登录控制器',
})
export class AdminController extends BaseController {
  @Inject()
  protected service: AdminVerifyService;

  @Get('/captcha/img', { summary: '获取图片验证码' })
  @Validate()
  async captchaByImg(@Query(ALL) captcha: LoginImageCaptchaDto) {
    const res = await this.service.getImgCaptcha(captcha);
    return this.success(res);
  }

  @Validate()
  @Post('/login', { summary: '管理员登录' })
  async login(
    @Body()
    param: AdminLoginDTO
  ) {
    const res = await this.service.login(param);
    return this.success(res);
  }
}
