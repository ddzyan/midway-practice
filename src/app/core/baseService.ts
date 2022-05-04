import { App, Inject } from '@midwayjs/decorator';
import { Application, Context } from '@/interface';

export abstract class BaseService {
  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

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
