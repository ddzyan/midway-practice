import { Provide, Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

@Provide()
@Scope(ScopeEnum.Singleton) // 单例
class RedisUtils {
  @Inject()
  private redis: RedisService;

  public async checkLock(key: string) {
    const result = await this.redis.get(key);
    return !!result;
  }

  public async getLock(key: string, expireTime: number) {
    const lock = await this.redis.get(key);
    if (lock) {
      return false;
    }

    await this.redis.set(key, 1, 'EX', expireTime);
    return true;
  }

  public async unLock(key) {
    const lock = await this.redis.get(key);
    if (!lock) {
      return true;
    }

    const res = await this.redis.del(key);
    return res;
  }

  public async setValue(key: string, value: string, expireTime?: number) {
    if (!expireTime) {
      await this.redis.set(key, value);
    } else {
      await this.redis.set(key, value, 'EX', expireTime);
    }
  }

  public async getString(key: string) {
    if (!key) {
      return null;
    }

    return await this.redis.get(key);
  }
}

export default RedisUtils;
