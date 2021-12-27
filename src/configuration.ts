import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

@Configuration({
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady(): Promise<void> {
    client.$connect();
    console.log('[ Prisma ] Prisma Client Connected');
    this.app.getApplicationContext().registerObject('prisma', client);
    console.log('[ Prisma ] Prisma Client Injected');
    // Initial Data Seeding
    await client.user.create({
      data: {
        name: '张三',
        email: `${Math.floor(Math.random() * 1000)}abc@gmail.com`,
      },
    });
    console.log('[ Prisma ] Prisma Client Initial Data Inserted');
  }

  async onStop(): Promise<void> {
    client.$disconnect();
  }
}
