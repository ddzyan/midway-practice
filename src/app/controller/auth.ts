import { Controller, Get, Inject } from '@midwayjs/decorator';
import { BaseController } from '../../core/baseController';

@Controller('/auth')
export class AuthController extends BaseController {
  @Inject()
  ctx;

  @Get('/github')
  async githubOAuth() {}

  @Get('/github/cb')
  async githubOAuthCallback() {
    const user = this.ctx.state.user;
    this.success(user);
  }
}
