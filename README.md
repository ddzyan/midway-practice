# 简介

使用 midway + koa + ORM + Restful 接口基础功能，应用服务基础功能，做到业务开发开箱即用。

实现功能：

- 系统功能
  - [x] 请求日志中间件
  - [x] 统一响应中间件
  - [x] 响应格式统一中间件
  - [x] 定时任务
  - [x] 请求参数验证
  - [x] swagger 接入
  - [x] JWT 验证
  - [x] 添加通用工具类（日后拆除）
  - [x] 增加 redis 相关配置
  - [x] 封装 redis 工具类
  - [x] 增加后台请求日志，保存到数据库中
- ORM
  - [x] 表结构生成
  - [x] CRUD
  - [x] 关联查询
  - [x] 原始查询
  - [x] query 日志
  - [x] 事务
- 部署
  - [x] DockerFile 编写
  - [x] docker-compose 编写
  - [x] 生产环境部署优化
- 单元测试
  - [x] controller
  - [x] service
  - [x] task
- 工程化
  - [x] 添加 husky
    - 提交检查 commit 格式，运行单元测试和代码格式检查

## 使用

执行 ./sql/test.sql 初始化数据库

将 .env.local 文件重命名 .env 并且将配置修改正确

```bash
npm i

npm run dev
```

swagger 文档地址：http://127.0.0.1:7001/swagger-ui/index.html

## 根据数据库表快速生产 Midway Sequelize Entity

```shell
$ npx sequelize-auto-midway -h localhost -d yourDBname -u root -x yourPassword -p 13306  --dialect mysql -o ./src/app/entity --noInitModels true --caseModel c --caseProp c --caseFile c --indentation 1 -a ./additional.json
```

additional.json

```json
{
  "timestamps": true,
  "paranoid": true
}
```

具体请参考 [sequelize-auto-midway](https://github.com/happyNode/sequelize-auto-midway)

## 生成数据库说明文件

```shell
$ npx db2md g -u root -p 3306 -pwd 123456 -h 127.0.0.1 test -o ./sql

```

# 更新记录

- **[2022-12-06]**
  - 优化 docker 打包启动失败问题
- **[2022-12-06]**
  - @midway 组件升级到 3.8.0，修改 sequelize 默认数据源获取方法
  - 新增 serverTimeout 配置, 定义服务端超时时间。
  - 去除 baseService getTransaction 方法
- **[2022-11-18]** baseService 添加 createMany,count,getTransaction 方法
- **[2022-11-17]** 添加自动化生产 Mysql 数据库表说明文件
- **[2022-11-10]** 通用模块化，使用 happy-node-utils 集成
