import { Middleware } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { HeadersKey } from '@mw-components/jaeger';
import { KoidComponent } from '@mw-components/koid';

import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class RequestIdMiddleware implements IMiddleware<Context, NextFunction> {
  public static getName(): string {
    return 'requestId';
  }

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const key = HeadersKey.reqId;
      let reqId = ctx.get(key);

      if (reqId) {
        ctx.reqId = reqId;
      } else {
        const koid = await ctx.requestContext.getAsync(KoidComponent);
        reqId = koid.idGenerator.toString();
        ctx.reqId = reqId;
      }
      const startTime = Date.now();
      ctx.set(key, reqId);
      await next();
      const reportTime = Date.now() - startTime;
      ctx.set('X-Response-Time', reportTime.toString());
    };
  }

  public match(ctx: Context): boolean {
    return ctx.path.indexOf('/api') !== -1;
  }
}
