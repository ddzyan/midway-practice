import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { IAccessLogConfig } from '../interface';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640593084642_6476';

  config.accessLogConfig = {
    ignore: [/\/swagger-u.*/u],
  } as IAccessLogConfig;

  // add your config here
  config.middleware = [
    'requestIdMiddleware',
    'formatMiddleware',
    'accessLogMiddleware',
    'errorHandlerMiddleware',
  ];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.security = {
    csrf: false,
  };

  config.orm = {
    type: 'mysql',
    // maxQueryExecutionTime: 1000,
    namingStrategy: new SnakeNamingStrategy(),
    timezone: '+08:00', // 服务器上配置的时区
  };

  config.egg = {
    contextLoggerFormat: info => {
      const ctx = info.ctx;
      return `${info.timestamp} ${info.LEVEL} ${info.pid} [${ctx.reqId} ${
        ctx.userId
      } - ${Date.now() - ctx.startTime}ms ${ctx.method} ${ctx.url}] ${
        info.message
      }`;
    },
  };

  return config;
};
