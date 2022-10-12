import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

import MyError from '../app/comm/myError';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  public static getName(): string {
    return 'format';
  }

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const result = await next();
        if (result === null) {
          ctx.status = 200;
        }

        return {
          code: 0,
          msg: 'OK',
          data: result,
        };
      } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);

        const myErr = err as MyError;

        // 兼容运行ci的时候，assert抛出的错误为AssertionError没有status
        const [message, messageStatus] = myErr.message?.split(' &>');

        let status = myErr.status || parseInt(messageStatus) || 500;
        if (myErr.name === 'ValidationError' || message === 'ValidationError') {
          status = 422;
        }

        ctx._internalError = myErr;

        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error =
          status === 500 && process.env.NODE_ENV === 'prod'
            ? 'Internal Server Error'
            : message;

        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = { code: status, msg: error, data: {} };
        if (status === 422) {
          (ctx.body as any).data = myErr.errors || myErr.details || {}; // 兼容 midway 参数校验
        }
        ctx.status = status;
      }
    };
  }

  public match(ctx: Context): boolean {
    return ctx.path.startsWith('/api');
  }
}
