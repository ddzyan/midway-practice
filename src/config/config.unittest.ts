export const redis = {
  client: {
    port: process.env.REDIS_CLIENT_PORT,
    host: process.env.REDIS_CLIENT_HOST,
    password: process.env.REDIS_CLIENT_PASSWORD,
    db: process.env.REDIS_CLIENT_DB,
  },
};

export const task = {
  redis: {
    port: process.env.REDIS_CLIENT_PORT,
    host: process.env.REDIS_CLIENT_HOST,
    password: process.env.REDIS_CLIENT_PASSWORD,
  }, //此处相当于是ioredis的配置 https://www.npmjs.com/package/ioredis
};

export const sequelize = {
  options: {
    database: process.env.DATABASE_DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
};
