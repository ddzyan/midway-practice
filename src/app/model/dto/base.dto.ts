import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class QueryParam {
  @CreateApiPropertyDoc('页码')
  @Rule(RuleType.number().default(1).required())
  page: number;

  @CreateApiPropertyDoc('数量')
  @Rule(RuleType.number().default(10).required())
  limit: number;
}
