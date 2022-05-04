import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';

import { Context } from '@/interface';

@Catch(httpError.NotFoundError)
export default class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    return {
      message: '404, ' + ctx.path,
    };
  }
}
