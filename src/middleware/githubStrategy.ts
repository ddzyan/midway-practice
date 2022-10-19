import { Config } from '@midwayjs/core';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, StrategyOptions } from 'passport-github';

@CustomStrategy()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  @Config('githubAuth')
  githubAuth;

  async validate(...payload) {
    return payload;
  }
  getStrategyOptions(): StrategyOptions {
    return {
      clientID: this.githubAuth.clientID,
      clientSecret: this.githubAuth.clientSecret,
      callbackURL: this.githubAuth.callbackURL,
    };
  }
}
