import { Provide, Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

@Provide()
@Scope(ScopeEnum.Singleton) // 单例
class RedisUtils {
  @Inject()
  redisService: RedisService;

  async getLock(key: string, expireTime: number) {
    const lock = await this.redisService.get(key);
    if (lock) {
      return false;
    }

    await this.redisService.set(key, 'true', 'EX', expireTime);
    return true;
  }

  async unLock(key) {
    const lock = await this.redisService.get(key);
    if (!lock) {
      return true;
    }

    const res = await this.redisService.del(key);
    return res;
  }

  async setValue(key: string, value: string, expireTime?: number) {
    if (!expireTime) {
      await this.redisService.set(key, value);
    } else {
      await this.redisService.set(key, value, 'EX', expireTime);
    }
  }

  async getString(key: string) {
    if (!key) {
      return null;
    }

    return await this.redisService.get(key);
  }
}

export default RedisUtils;
