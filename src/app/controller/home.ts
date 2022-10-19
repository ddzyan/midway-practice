import { Controller, Get } from '@midwayjs/core';

import { BaseController } from '../../core/baseController';

@Controller('/')
export class HomeController extends BaseController {
  @Get('/')
  async home() {
    const { ctx } = this;

    if (ctx.isAuthenticated()) {
      ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logined user: <img src="${ctx.user.avatar_url}"> ${
        ctx.user.nickname
      } / ${ctx.user.id} | <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>`;
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/github">Github</a> | <a href="/login">账号密码登录</a>
          <hr>
          <a href="/">Home</a> | <a href="/user">User</a>
        </div>
      `;
    }
  }
}
