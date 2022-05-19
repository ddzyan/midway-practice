import { App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';

export abstract class BaseService {
  @App()
  protected app: koa.Application;

  @Inject()
  protected ctx: koa.Context;

  protected mapping;

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const res = await this.mapping.findAll(page, offset);
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
