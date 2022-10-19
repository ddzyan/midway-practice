import { AuthenticateOptions, PassportMiddleware } from '@midwayjs/passport';
import { Middleware } from '@midwayjs/decorator';
import { GithubStrategy } from './githubStrategy';

@Middleware()
export class GithubPassportMiddleware extends PassportMiddleware(
  GithubStrategy
) {
  getAuthenticateOptions(): AuthenticateOptions | Promise<AuthenticateOptions> {
    return {};
  }
}
