import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, StrategyOptions } from 'passport-github';

const GITHUB_CLIENT_ID = 'e3fe9c5fa43d66a0087f',
  GITHUB_CLIENT_SECRET = 'c34a678190b3db2cca47772db34e270d4dad6293';

@CustomStrategy()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  async validate(...payload) {
    return payload;
  }
  getStrategyOptions(): StrategyOptions {
    return {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:7001/auth/github/cb',
    };
  }
}
