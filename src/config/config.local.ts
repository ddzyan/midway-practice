import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config = {} as MidwayConfig;
  config.redis = {
    client: {
      port: 16379,
      host: '127.0.0.1',
      db: 0,
    },
  };
  config.task = {
    redis: {
      port: 16379,
      host: '127.0.0.1',
    },
  };
  config.sequelize = {
    dataSource: {
      default: {
        database: 'test',
        username: 'root',
        password: 'B9tiNZ7dXrk2qwr6',
        host: '127.0.0.1',
        port: 13306,
        logging: true,
      },
    },
  };
  return config;
};
