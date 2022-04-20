import * as validateComp from '@midwayjs/validate';
import * as webFramework from '@midwayjs/web';
import { App, Configuration, Logger } from '@midwayjs/decorator';
import * as task from '@midwayjs/task';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayLogger } from '@midwayjs/logger';
import * as swagger from '@midwayjs/swagger';
import * as jaeger from '@mw-components/jaeger';
import * as koid from '@mw-components/koid';
import { Application, NpmPkg } from '@/interface';
import * as redis from '@midwayjs/redis';
import * as orm from '@midwayjs/orm';
import * as dotenv from 'dotenv';
import * as unittestConfig from './config/config.unittest';
import * as prodConfig from './config/config.prod';
import * as localConfig from './config/config.local';
import * as defaultConfig from './config/config.default';

dotenv.config();

@Configuration({
  importConfigs: [
    {
      default: defaultConfig,
      local: localConfig,
      prod: prodConfig,
      unittest: unittestConfig,
    },
  ],
  conflictCheck: true,
  imports: [
    webFramework,
    jaeger,
    koid,
    swagger,
    redis,
    task,
    orm,
    validateComp,
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;
  @Logger()
  readonly logger: IMidwayLogger;

  async onReady(): Promise<void> {
    // 需要显式在 app 启动时用 getAsync() 的方式进行触发，否则该类只有在首次被业务逻辑调用的时候才能初始化
    // await this.app.getApplicationContext().getAsync('rabbitmqService');
    this.app.config.pkgJson = this.app.config.pkg as NpmPkg;
    const { pkgJson } = this.app.config;
    const info = {
      pkgName: pkgJson.name,
      pkgVersion: pkgJson.version,
    };
    // eslint-disable-next-line no-console
    console.log('✅ Your APP launched', info);
  }

  async onStop(): Promise<void> {}
}
