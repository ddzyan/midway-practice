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
  config.middleware = ['accessLogMiddleware', 'errorHandlerMiddleware'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.taskConfig = {
    prefix: 'midway-task', // 这些任务存储的key，都是midway-task开头，以便区分用户原有redis里面的配置。
    defaultJobOptions: {
      repeat: {
        tz: 'Asia/Shanghai', // Task等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
      },
    },
  };

  config.orm = {
    type: 'mysql',
    // maxQueryExecutionTime: 1000,
    namingStrategy: new SnakeNamingStrategy(),
    timezone: '+08:00', // 服务器上配置的时区
  };

  return config;
};
