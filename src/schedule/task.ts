import { Inject, Provide, TaskLocal } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

import { UserService } from '../app/service/user';

@Provide()
export class TaskService {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  // 例如下面是每秒钟执行一次
  @TaskLocal('* * * * * *')
  async test() {
    console.log(this.userService.getName());
  }
}
