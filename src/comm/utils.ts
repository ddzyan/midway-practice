import { Inject, Provide } from '@midwayjs/decorator';
import * as _ from 'lodash';
import { Context } from 'egg';

@Provide()
export class Utils {
  @Inject()
  baseDir;

  async getReqIP(ctx: Context) {
    const { req } = ctx;
    return (
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress.replace('::ffff:', '')
    );
  }
}
