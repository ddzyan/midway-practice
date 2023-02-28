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

  config.bull = {
    defaultQueueOptions: {
      redis: {
        port: +process.env.REDIS_CLIENT_PORT,
        host: process.env.REDIS_CLIENT_HOST,
        db: +process.env.REDIS_CLIENT_DB,
        password: process.env.REDIS_CLIENT_PASSWORD,
      },
    },
  };

  config.cache = {
    options: {
      host: process.env.REDIS_CLIENT_HOST,
      port: +process.env.REDIS_CLIENT_PORT,
      password: process.env.REDIS_CLIENT_PASSWORD,
      db: +process.env.REDIS_CLIENT_DB,
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

  config.jwt = {
    secret: process.env.SECRET,
  };

  config.midwayLogger = {
    clients: {
      appLogger: {
        enableJSON: true,
        enableFile: false,
        jsonFormat: (info, meta) => {
          const { timestamp, message } = info;
          const { ctx, pid, level } = meta;
          const { reqId, startTime, method, url } = ctx;
          const obj = {
            timestamp,
            level,
            pid,
            message,
            reqId,
            startTime,
            method,
            url,
          };
          return obj;
        },
      },
    },
  };

  config.koa = {
    contextLoggerFormat: info => {
      const { ctx, timestamp, LEVEL: level, pid, message } = info;
      const { startTime, method, url, reqId } = ctx;
      const obj = {
        timestamp,
        level,
        pid,
        message,
        reqId,
        startTime,
        method,
        url,
      };
      return JSON.stringify(obj);
    },
  };

  return config;
};
