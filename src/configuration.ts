import * as dotenv from 'dotenv';
dotenv.config();

import * as webFramework from '@midwayjs/web';
import { App, Configuration, Logger } from '@midwayjs/decorator';
import * as task from '@midwayjs/task';
import * as validate from '@midwayjs/validate';
import * as crossDomain from '@midwayjs/cross-domain';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayLogger } from '@midwayjs/logger';
import * as swagger from '@midwayjs/swagger';
import * as jaeger from '@mw-components/jaeger';
import * as koid from '@mw-components/koid';
import * as redis from '@midwayjs/redis';
import * as sequlize from '@midwayjs/sequelize';
import { join } from 'path';

import { Application, NpmPkg } from '@/interface';
import RequestIdMiddleware from './middleware/requestId';
import FormatMiddleware from './middleware/format';
import AccessLogMiddleware from './middleware/accessLog';
import NotFoundFilter from './filter/notfound';

@Configuration({
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
  imports: [
    crossDomain,
    webFramework,
    jaeger,
    koid,
    { component: swagger, enabledEnvironment: ['local'] },
    redis,
    task,
    validate,
    sequlize,
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;
  @Logger()
  readonly logger: IMidwayLogger;

  async onReady(): Promise<void> {
    this.app.useMiddleware([
      RequestIdMiddleware,
      AccessLogMiddleware,
      FormatMiddleware,
    ]);
    this.app.useFilter([NotFoundFilter]);

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
