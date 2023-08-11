import { DatabaseError, ValidationError, Transaction } from 'sequelize';
import { Context } from '@midwayjs/koa';
import { Inject } from '@midwayjs/decorator';
import { Model, Repository } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { InjectDataSource } from '@midwayjs/sequelize';

type Reverse<T> = (state: any, action: any) => T;

export abstract class BaseMapping<T extends Model> {
  @Inject()
  protected ctx: Context;

  @InjectDataSource()
  defaultDataSource: Sequelize;

  abstract getModel(): Repository<T>;

  async execSql<T>(func: Reverse<T>): Promise<T> {
    try {
      const res = await func;
      return res as T;
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

  async saveNew(createParams, options = {}): Promise<T> {
    const res = await this.getModel().create(createParams, options);

    return res;
  }

  async findAll(where = {}, options = {}): Promise<T[]> {
    const res = await this.getModel().findAll({
      where,
      order: [['createdAt', 'desc']],
      ...options,
    });

    return res;
  }

  async findByPk(id: number, options = {}): Promise<T> {
    const res = await this.getModel().findByPk(id, { ...options });

    return res;
  }

  async findOne(where, options = {}): Promise<T> {
    const res = await this.getModel().findOne({
      where,
      ...options,
    });

    return res;
  }

  async getTransaction(): Promise<Transaction> {
    const t = await this.getModel().sequelize.transaction();
    return t;
  }

  async destroy(where, option = {}): Promise<number> {
    Object.assign(option, { where });
    const res = await this.getModel().destroy(option);

    return res;
  }

  async modify(param, where, option: object = {}): Promise<number> {
    const [affectedCount] = await this.getModel().update(param, {
      where,
      ...option,
    });

    return affectedCount;
  }

  async findAndCountAll(
    page: number,
    limit: number,
    where = {}
  ): Promise<{
    rows: T[];
    count: number;
  }> {
    const offset = (page - 1) * limit;

    const res = await this.getModel().findAndCountAll({
      where,
      limit,
      offset: offset > 0 ? offset : 0,
      order: [['createdAt', 'desc']],
    });

    return res;
  }

  async bulkCreate(data, t?): Promise<T[]> {
    const res = await this.getModel().bulkCreate(data, { transaction: t });

    return res;
  }

  async findOrCreate(where, defaults): Promise<[T, boolean]> {
    const res = await this.getModel().findOrCreate({
      where,
      defaults,
    });

    return res;
  }

  async count(where, options = {}): Promise<number> {
    const res = await this.getModel().count({
      where,
      ...options,
    });

    return res;
  }

  async queryRaw(sqlStr: string, option?: any): Promise<[undefined, number]> {
    const res = await this.getModel().sequelize.query(sqlStr, option);
    return res;
  }
}
