import 'tsconfig-paths/register';

import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';

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
        const app: Application = await createApp<Framework>();
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
