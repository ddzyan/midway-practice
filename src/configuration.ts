import { join } from 'path';
import { App, Configuration, Logger } from '@midwayjs/decorator';
import * as task from '@midwayjs/task';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayLogger } from '@midwayjs/logger';
import * as swagger from '@midwayjs/swagger';
import { PrismaClient } from '@prisma/client';
import * as jaeger from '@mw-components/jaeger';
import * as koid from '@mw-components/koid';
import { Application, NpmPkg } from '@/interface';
import * as redis from '@midwayjs/redis';

import { customLogger } from './app/comm/customLogger';

const client = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});
@Configuration({
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
  imports: [jaeger, koid, swagger, redis, task],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Logger()
  readonly logger: IMidwayLogger;

  async onReady(): Promise<void> {
    client.$connect();

    // 输出查询日志
    client.$on('query', e => {
      this.app.logger.info(
        'Query: %s , params: %s , duration: %d ms',
        e.query,
        e.params,
        e.duration
      );
    });

    this.app.logger.info('[ Prisma ] Prisma Client Connected');
    this.app.getApplicationContext().registerObject('prisma', client);
    this.app.logger.info('[ Prisma ] Prisma Client Injected');

    this.app.config.pkgJson = this.app.config.pkg as NpmPkg;

    // 定制化日志
    customLogger(this.logger, this.app);

    // const coreMiddlewareArr = this.app.getConfig('coreMiddleware') as string[]
    const coreMiddlewareArr = this.app.config.coreMiddleware as string[];

    // 增加全局x-request-id处理中间件
    coreMiddlewareArr.splice(0, 0, 'requestIdMiddleware');

    // 需要显式在 app 启动时用 getAsync() 的方式进行触发，否则该类只有在首次被业务逻辑调用的时候才能初始化
    // await this.app.getApplicationContext().getAsync('rabbitmqService');

    const { pkgJson } = this.app.config;
    const info = {
      pkgName: pkgJson.name,
      pkgVersion: pkgJson.version,
    };
    // eslint-disable-next-line no-console
    console.log('✅ Your APP launched', info);
  }

  async onStop(): Promise<void> {
    client.$disconnect();
  }
}
