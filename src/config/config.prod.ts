export const redis = {
  client: {
    port: process.env.REDIS_CLIENT_PORT,
    host: process.env.REDIS_CLIENT_HOST,
    password: process.env.REDIS_CLIENT_PASSWORD,
    db: process.env.REDIS_CLIENT_DB,
  },
};

export const taskConfig = {
  redis: {
    port: process.env.REDIS_CLIENT_PORT,
    host: process.env.REDIS_CLIENT_HOST,
    password: process.env.REDIS_CLIENT_PASSWORD,
  }, //此处相当于是ioredis的配置 https://www.npmjs.com/package/ioredis
};

export const orm = {
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_URL,
  username: process.env.DATABASE_URL,
  password: process.env.DATABASE_URL,
  database: process.env.DATABASE_URL,
  synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
  logging: ['query', 'error'],
};

export const logger = {
  dir: '/home/logs/midway-practice',
};
