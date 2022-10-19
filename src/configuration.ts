import * as dotenv from 'dotenv';
dotenv.config();

import * as koa from '@midwayjs/koa';
import * as crossDomain from '@midwayjs/cross-domain';
import {
  ILifeCycle,
  IMidwayContainer,
  App,
  Configuration,
  Logger,
} from '@midwayjs/core';
import { IMidwayLogger } from '@midwayjs/logger';
import * as swagger from '@midwayjs/swagger';
import * as jaeger from '@mw-components/jaeger';
import * as koid from '@mw-components/koid';
import * as redis from '@midwayjs/redis';
import { join } from 'path';
import * as passport from '@midwayjs/passport';

import { RequestIdMiddleware } from './middleware/requestId';
import { FormatMiddleware } from './middleware/format';
import { AccessLogMiddleware } from './middleware/accessLog';
import { GithubPassportMiddleware } from './middleware/github';
import { NotFoundFilter } from './filter/notfound';

@Configuration({
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
  imports: [
    crossDomain,
    koa,
    jaeger,
    koid,
    { component: swagger, enabledEnvironment: ['local'] },
    redis,
    passport,
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;
  @Logger()
  readonly logger: IMidwayLogger;

  async onReady(applicationContext: IMidwayContainer): Promise<void> {
    this.app.useMiddleware([
      RequestIdMiddleware,
      AccessLogMiddleware,
      FormatMiddleware,
      GithubPassportMiddleware,
    ]);
    this.app.useFilter([NotFoundFilter]);
  }

  async onStop(): Promise<void> {}
}
