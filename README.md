# 简介

使用 midway + TypeORM 完成 数据库 CRUD ， Restful 接口基础功能，应用服务基础功能

实现功能：

- 系统功能
  - [x] 定时任务
  - [x] 请求日志中间件
  - [x] 统一响应中间件
  - [x] 请求参数验证
  - [x] swagger 接入
  - [x] 添加通用工具类（日后拆除）
  - [x] 增加 redis 相关配置
  - [x] 封装 redis 工具类
- typeORM
  - [x] 表结构生成
  - [x] CRUD
  - [x] 关联查询
  - [ ] 原始查询
  - [x] query 日志
- 部署
  - [x] DockerFile 编写
  - [x] docker-compose 编写
  - [x] 生产环境部署优化

## 使用

执行 ./src/app/prisma/migrations/20220115114834_init 下的 migration.sql 初始化数据库

```bash
npm i

npm run prisma:generate

npm run dev
```

swagger 文档地址：http://127.0.0.1:7001/swagger-ui/index.html

# prisma 介绍

## 相关指令

```bash
# 同步数据库最新schema
npx prisma db pull --schema ./src/prisma/schema.prisma

# 将本地最新配置同步数据库schema
npx prisma db push --schema ./src/prisma/schema.prisma

# 生成最新的 prisma client
npx prisma generate --schema ./src/prisma/schema.prisma
```

## 流程

在未来你可以按照下面流程完成 prisma client 生成：

1. 使用 SQL 在数据库上完成修改（包含 CREATE TABLE，ALTER TABLE 等）
2. 执行 prisma db pull 同步生成模型并且添加到 prisma.schema 中
3. 执行 prisma generate 更新 prisma client

## 生成 sql 迁移文件

在生产上执行 prisma db push 同步本地的 schema ，可能不是一个好的决定（因为生产数据库账号往往没有 DML 权限），此时我们可以在本地修改 prisma.schema 中的模型定义，然后执行 `npx prisma migrate --schema ./src/prisma/schema.prisma` 生成最新迁移变动 sql，再拿去执行变更（这往往是正确的决定）
