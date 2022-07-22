import { Inject } from '@midwayjs/decorator';
import { DatabaseError, ValidationError } from 'sequelize';
import { Context } from '@midwayjs/koa';

export abstract class BaseMapping {
  @Inject()
  ctx: Context;

  protected repository;

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

  async saveNew(createParams) {
    const res = await this.execSql(this.repository.create(createParams));
    return res;
  }

  async findOne(where, options = {}) {
    const res = await this.execSql(
      this.repository.findOne({
        where,
        order: [['createdAt', 'desc']],
        ...options,
      })
    );
    return res;
  }

  async findAll(where = {}, options = {}) {
    const res = await this.execSql(
      this.repository.findAll({
        where,
        ...options,
        order: [['createdAt', 'desc']],
      })
    );
    return res;
  }

  async findByPk(id: number, options = {}) {
    const res = await this.execSql(
      this.repository.findByPk(id, { ...options })
    );
    return res;
  }

  async findAndCountAll(page: number, limit: number, where = {}) {
    const offset = (page - 1) * limit;
    const res = await this.execSql(
      this.repository.findAndCountAll({
        where,
        limit,
        offset: offset > 0 ? offset : 0,
        order: [['createdAt', 'desc']],
      })
    );
    return res;
  }

  async modify(updateParams, where, options = {}) {
    const [effect] = await this.execSql(
      this.repository.update(updateParams, {
        where,
        ...options,
      })
    );
    return effect;
  }

  async destroy(where, options = {}) {
    const res = await this.execSql(
      this.repository.destroy({
        where,
        ...options,
      })
    );
    return res;
  }

  async queryRaw(sqlStr: string, option?: any) {
    const res = await this.repository.sequelize.query(sqlStr, option);
    return res;
  }
}
