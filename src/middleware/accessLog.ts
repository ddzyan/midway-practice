import { Provide } from '@midwayjs/decorator';
import {
  IMidwayWebNext,
  IWebMiddleware,
  MidwayWebMiddleware,
} from '@midwayjs/web';

import { Context } from 'egg';

@Provide()
export class AccessLogMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return accessLogMiddleware;
  }
}

async function accessLogMiddleware(
  ctx: Context,
  next: IMidwayWebNext
): Promise<void> {
  const requestBody =
    ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body || {};
  // 输出请求日志
  ctx.logger.info('requestQuery %j', requestBody);
  await next();
  const { body } = ctx;
  ctx.logger.info('responseBody %j', body);
  // 输出响应日志
}
