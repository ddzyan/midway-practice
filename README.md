# 简介

使用 midway + prisma 完成 数据库 CRUD ， Restful 接口基础功能，应用服务基础功能

# 使用

创建数据 lotus 和执行下面 SQL，提现创建相关表

```sql
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
```

```bash
npm i

npm run prisma:generate

npm run dev
```

# prisma 相关指令

```
# 同步数据库最新schema
npm run prisma:pull

# 将本地最新配置同步数据库schema
npm run prisma:push

# 生成最新的 prisma client
npm run prisma:generate
```
