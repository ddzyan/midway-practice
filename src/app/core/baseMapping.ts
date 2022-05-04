import { DatabaseError, ValidationError } from 'sequelize';

import { Context } from '@/interface';

export default abstract class BaseMapping {
  ctx: Context;

  protected abstract entity;

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
}
