import { App, Inject } from '@midwayjs/core';
import { Application, Context } from '@midwayjs/koa';
import { DatabaseError, ValidationError } from 'sequelize';
import { Model, Repository, Sequelize } from 'sequelize-typescript';
import { InjectDataSource } from '@midwayjs/sequelize';

export abstract class BaseService<T extends Model> {
  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

  // 注入默认数据源
  @InjectDataSource()
  protected defaultDataSource: Sequelize;

  abstract getModel(): Repository<T>;

  async execSql(func) {
    try {
      const res = await func;
      return res;
    } catch (error) {
      let logText;
      if (error instanceof DatabaseError) {
        const { message, sql, stack, parameters, name } = error;
        const parametersStr =
          typeof parameters === 'object'
            ? JSON.stringify(parameters)
            : parameters;
        logText = `[sequelize error] DatabaseError||name=${name} message=${message} sql=${sql} parameters=${parametersStr} stack=${stack}`;
      } else if (error instanceof ValidationError) {
        const { message, stack, name, errors } = error;
        logText = `[sequelize error] ValidationError||name=${name} message=${message} errors=${errors} stack=${stack}`;
      }
      (this as any).ctx.logger.error(logText);
      throw error;
    }
  }

  async findAndCountAll(page: number, limit: number, where = {}) {
    const offset = (page - 1) * limit;
    const res = await this.getModel().findAndCountAll({
      where,
      limit,
      offset: offset > 0 ? offset : 0,
      order: [['createdAt', 'desc']],
    });

    return res;
  }

  async findAll(where = {}, options = {}) {
    const res = await this.getModel().findAll({
      where,
      ...options,
      order: [['createdAt', 'desc']],
    });

    return res;
  }

  async findOne(where = {}, options = {}) {
    const res = await this.getModel().findOne({
      where,
      order: [['createdAt', 'desc']],
      ...options,
    });
    return res;
  }

  async save(param) {
    const res = await this.getModel().create(param);
    return res;
  }

  async modify(param, where, options) {
    const [effect] = await this.getModel().update(param, {
      where,
      ...options,
    });
    return effect;
  }

  async destroy(where = {}, options = {}) {
    const res = await this.getModel().destroy({
      where,
      ...options,
    });
    return res;
  }

  async findByPk(id: number, options = {}) {
    const res = await this.getModel().findByPk(id, { ...options });
    return res;
  }

  async createMany(params, options = {}) {
    const res = await this.getModel().bulkCreate(params, options);
    return res;
  }

  async count(where) {
    const number = await this.getModel().count({ where });
    return number;
  }

  async queryRaw(sqlStr: string, option?: any) {
    const res = await this.getModel().sequelize.query(sqlStr, option);
    return res;
  }
}
