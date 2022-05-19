import { Inject } from '@midwayjs/decorator';
import { DatabaseError, ValidationError } from 'sequelize';
import { Context } from '@midwayjs/koa';

import { ClassroomEntity } from '../app/entity/classroom';

export  abstract class BaseMapping {
  @Inject()
  ctx: Context;

  protected abstract entity;

  async getTransaction() {
    const t = await ClassroomEntity.sequelize.transaction();
    return t;
  }

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
    const res = await this.execSql(this.entity.create(createParams));
    return res;
  }

  async findOne(where) {
    const res = await this.execSql(
      this.entity.findOne({
        where,
        order: [['createdAt', 'desc']],
      })
    );
    return res;
  }

  async findAll(limit: number, offset: number) {
    const res = await this.execSql(
      this.entity.findAll({
        limit,
        offset,
        order: [['createdAt', 'desc']],
      })
    );
    return res;
  }

  async findAndCountAll(limit: number, offset: number) {
    const res = await this.execSql(
      this.entity.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'desc']],
      })
    );
    return res;
  }

  async modify(updateParams, where) {
    const [effect] = await this.execSql(
      this.entity.update(updateParams, {
        where,
      })
    );
    return effect;
  }

  async destroy(where, t) {
    const res = await this.execSql(
      this.entity.destroy({
        where,
        t,
      })
    );
    return res;
  }

  async findByPk(id: number) {
    const res = await this.execSql(this.entity.findByPk(id));
    return res;
  }
}
