import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

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
  config.middleware = ['accessLogMiddleware', 'errorHandlerMiddleware'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.security = {
    csrf: false,
  };

  return config;
};
