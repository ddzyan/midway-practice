import { IMiddleware } from '@midwayjs/core';
import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

import { PathToRegexp } from '../app/comm/pathToRegexp';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private pathToRegexp: PathToRegexp;

  @Config('jwt')
  private jwtConfig;

  public static getName(): string {
    return 'jwt';
  }

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { path } = ctx;
      const [, token] = ctx.get('authorization')?.trim().split(' ') || ['', ''];
      const ignore = this.pathToRegexp.pathMatch(
        this.jwtConfig.whitelist,
        path,
        false
      );
      if (!token && !ignore) {
        throw new httpError.UnauthorizedError();
      }
      try {
        const user = await this.jwtService.verify(
          token,
          this.jwtConfig.verifyOptions
        );
        ctx.state.token = token;
        ctx.state.user = user;
      } catch (error) {
        if (!ignore) {
          throw new httpError.UnauthorizedError();
        }
      }
      await next();
    };
  }
}
