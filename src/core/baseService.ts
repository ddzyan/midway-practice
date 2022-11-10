import { App, Inject } from '@midwayjs/core';
import { Application, Context } from '@midwayjs/koa';

export abstract class BaseService {
  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

  protected mapping;

  async findAndCountAll(page: number, limit: number, where = {}) {
    const res = await this.mapping.findAndCountAll(page, limit, where);
    return res;
  }

  async findAll(where = {}, options = {}) {
    const res = await this.mapping.findAll(where, options);
    return res;
  }

  async findOne(where) {
    const res = await this.mapping.findOne(where);
    return res;
  }

  async create(createParams) {
    const res = await this.mapping.saveNew(createParams);
    return res;
  }

  async update(updateParams, where) {
    const res = await this.mapping.modify(updateParams, where);
    return res;
  }

  async destroy(where) {
    const res = await this.mapping.destroy(where);
    return res;
  }

  async findByPk(id: number) {
    const res = await this.mapping.findByPk(id);
    return res;
  }
}
