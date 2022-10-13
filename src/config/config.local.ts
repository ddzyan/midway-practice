import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config = {} as MidwayConfig;
  config.redis = {
    client: {
      port: +process.env.REDIS_CLIENT_PORT,
      host: process.env.REDIS_CLIENT_HOST,
      db: +process.env.REDIS_CLIENT_DB,
      password: process.env.REDIS_CLIENT_PASSWORD,
    },
  };
  config.sequelize = {
    dataSource: {
      default: {
        database: process.env.DATABASE_DATABASE,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        logging: false,
      },
    },
  };

  config.bull = {
    defaultQueueOptions: {
      redis: {
        port: +process.env.REDIS_CLIENT_PORT,
        host: process.env.REDIS_CLIENT_HOST,
        db: +process.env.REDIS_CLIENT_DB,
        password: process.env.REDIS_CLIENT_PASSWORD,
      },
      prefix: 'midway-task',
    },
  };

  return config;
};
