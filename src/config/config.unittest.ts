import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { join } from 'path';

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

  config.grpc = {
    services: [
      {
        url: 'localhost:6565',
        protoPath: join(appInfo.appDir, 'proto/email.proto'),
        package: 'email',
      },
    ],
  };
  return config;
};
