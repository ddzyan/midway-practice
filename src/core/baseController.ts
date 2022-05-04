import { App, Inject } from '@midwayjs/decorator';
import { Application, Context } from '@/interface';

export default abstract class BaseController {
  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

  protected service;

  protected success(data?) {
    this.ctx.status = 200;
    return data;
  }
}
