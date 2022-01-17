import { Inject, Provide, TaskLocal } from '@midwayjs/decorator';
import { Context } from '../interface';

@Provide()
export class TaskService {
  @Inject()
  ctx: Context;

  // 例如下面是每秒钟执行一次
  @TaskLocal('* * 1 * * *')
  async test() {
    this.ctx.logger.info('hello word');
  }
}
