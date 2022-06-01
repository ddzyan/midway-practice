import 'tsconfig-paths/register';

import { join } from 'path';
import * as WEB from '@midwayjs/koa';
import { createApp, close, createHttpRequest } from '@midwayjs/mock';

import { removeFileOrDir } from './util';
import { testConfig } from './root.config';

export const mochaHooks = async () => {
  // avoid run multi times
  if (!process.env.mochaRootHookFlag) {
    process.env.mochaRootHookFlag = 'true';
  }

  return {
    beforeAll: async () => {
      if (!testConfig.app) {
        const globalConfig = {
          keys: Math.random().toString(),
        };
        const opts = {
          imports: [WEB],
          globalConfig,
        };

        const app = (await createApp(
          join(__dirname, '..'),
          opts
        )) as WEB.Application;

        testConfig.app = app;
        testConfig.httpRequest = createHttpRequest(app);
        const container = app.getApplicationContext();
        testConfig.container = container;
      }
    },

    beforeEach: () => {},

    afterEach: () => {},

    afterAll: async () => {
      if (testConfig.app) {
        await close(testConfig.app);
      }
      removeFileOrDir(testConfig.logsDir).catch(() => void 0);
    },
  };
};
