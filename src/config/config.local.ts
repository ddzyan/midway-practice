export const security = {
  csrf: false,
};

export const redis = {
  client: {
    port: 16379,
    host: '127.0.0.1',
    password: '',
    db: 0,
  },
};

export const task = {
  redis: {
    port: 16379,
    host: '127.0.0.1',
    password: '',
  }, //此处相当于是ioredis的配置 https://www.npmjs.com/package/ioredis
  prefix: 'midway-task', // 这些任务存储的key，都是midway-task开头，以便区分用户原有redis里面的配置。
  defaultJobOptions: {
    repeat: {
      tz: 'Asia/Shanghai', // Task等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
    },
  },
};

export const orm = {
  host: '127.0.0.1',
  port: 13306,
  username: 'root',
  password: 'B9tiNZ7dXrk2qwr6',
  database: 'test',
  synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
  logging: ['error'],
};
