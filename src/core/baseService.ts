import { App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';

export default abstract class BaseService {
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

  async create(createParams) {
    const res = await this.mapping.saveNew(createParams);
    return res;
  }
}
