console.log(process.env);
export const security = {
  csrf: false,
};

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
  prefix: 'midway-task', // 这些任务存储的key，都是midway-task开头，以便区分用户原有redis里面的配置。
  defaultJobOptions: {
    repeat: {
      tz: 'Asia/Shanghai', // Task等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
    },
  },
};
