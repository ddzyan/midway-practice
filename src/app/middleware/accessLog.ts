import { Config, Provide, App } from '@midwayjs/decorator';
import {
  IMidwayWebNext,
  IWebMiddleware,
  MidwayWebMiddleware,
  IMidwayWebApplication,
} from '@midwayjs/web';
import { Context } from 'egg';
import { IAccessLogConfig } from '../../interface';

@Provide()
export class AccessLogMiddleware implements IWebMiddleware {
  @Config('accessLogConfig')
  accessLogConfig: IAccessLogConfig;

  @App()
  app: IMidwayWebApplication;

  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const { url } = ctx.request;
      const { ignore } = this.accessLogConfig;
      // 只有有一个符合条件
      const exist = ignore.find(item => item.test(url));
      if (exist) return await next();
      const requestBody =
        ctx.request.method === 'GET'
          ? ctx.request.query
          : ctx.request.body || {};
      // 输出请求日志
      ctx.logger.info('requestQuery %j', requestBody);
      await next();
      const { body } = ctx;
      ctx.logger.info('responseBody %j', body);
    };
  }
}
