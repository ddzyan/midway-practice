import { join } from 'path';

import { IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as request from 'supertest';

export interface TestConfig {
  /** host of test process */
  host: string;
  app: koa.Application;
  container: IMidwayContainer;
  httpRequest: request.SuperTest<request.Test>;
  next: koa.IMidwayKoaNext;
  logsDir: string;
}

const next: koa.IMidwayKoaNext = async () => {
  return;
};

export const testConfig = {
  next,
  logsDir: join(__dirname, '../logs'),
} as TestConfig;
