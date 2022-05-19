import { App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';

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
