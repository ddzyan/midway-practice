import { Middleware } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { HeadersKey } from '@mw-components/jaeger';
import { KoidComponent } from '@mw-components/koid';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class RequestIdMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return requestIdMiddleware;
  }
}

async function requestIdMiddleware(
  ctx: Context,
  next: NextFunction
): Promise<void> {
  const key = HeadersKey.reqId;
  let reqId = ctx.get(key);

  if (reqId) {
    ctx.reqId = reqId;
  } else {
    const koid = await ctx.requestContext.getAsync(KoidComponent);
    reqId = koid.idGenerator.toString();
    ctx.reqId = reqId;
  }

  ctx.set(key, reqId);

  await next();
}
