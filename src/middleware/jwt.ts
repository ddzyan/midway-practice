import {
  IMiddleware,
  httpError,
  Config,
  Inject,
  Middleware,
} from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

import { PathToRegexp } from '../app/comm/pathToRegexp';
import { UserContext } from '../app/comm/userContext';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private pathToRegexp: PathToRegexp;

  @Config('jwtWhitelist')
  private whitelist;

  public static getName(): string {
    return 'jwt';
  }

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const [, token] = ctx.get('authorization')?.trim().split(' ') || ['', ''];
      if (!token) {
        throw new httpError.UnauthorizedError();
      }
      try {
        const userStr = await this.jwtService.verify(token, {
          complete: true,
        });

        const payload: UserContext = userStr['payload'];
        ctx.userContext = payload;
      } catch (error) {
        throw new httpError.UnauthorizedError();
      }
      await next();
    };
  }

  public match(ctx: Context): boolean {
    const { path } = ctx;
    const ignore = this.pathToRegexp.pathMatch(this.whitelist, path, false);
    return !ignore;
  }
}
