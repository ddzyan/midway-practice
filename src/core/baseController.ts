import { App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';

export const ADMIN_PREFIX_URL = '/admin';
export const USER_PREFIX_URL = '/admin';

// 无需权限URL前缀
export const NOPERM_PREFIX_URL = '/common';
// 无需校验TOKEN的URL
export const NOAUTH_PREFIX_URL = '/public';

export abstract class BaseController {
  @App()
  protected app: koa.Application;

  @Inject()
  protected ctx: koa.Context;

  protected service;

  protected success(data?) {
    this.ctx.status = 200;
    return data;
  }
}
