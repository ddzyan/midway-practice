import { Provide } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { IMiddleware } from '@midwayjs/core';
import { SysReqLogService } from '../app/service/sysReqLog';

@Provide()
export class AdminReqLogMiddleware
  implements IMiddleware<Context, NextFunction>
{
  public static getName(): string {
    return 'adminReqLog';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const startTime = Date.now();
      await next();
      const reportTime = Date.now() - startTime;
      ctx.set('X-Response-Time', reportTime.toString());
      const { url } = ctx;
      ctx.requestContext.getAsync(SysReqLogService).then(service => {
        service.save(
          url.split('?')[0],
          ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body,
          ctx.status,
          reportTime,
          ctx.req.method,
          ctx.admin ? ctx.admin.uid : 1
        );
      });
    };
  }

  match(ctx: Context): boolean {
    return ctx.path.startsWith('/api/classroom');
  }
}
