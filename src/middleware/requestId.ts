import { Middleware, IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import * as utils from 'happy-node-utils';

@Middleware()
export class RequestIdMiddleware implements IMiddleware<Context, NextFunction> {
  public static getName(): string {
    return 'requestId';
  }

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const key = 'x-request-id';
      let reqId = ctx.get(key);

      if (reqId) {
        ctx.reqId = reqId;
      } else {
        reqId = utils.getRandom(32, 'alphanumeric');
        ctx.reqId = reqId;
      }
      ctx.set(key, reqId);
      await next();
    };
  }

  public match(ctx: Context): boolean {
    return ctx.path.startsWith('/api');
  }
}
