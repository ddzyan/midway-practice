import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class CreateClassroomInput {
  @CreateApiPropertyDoc('年')
  @Rule(RuleType.number().min(1).max(2))
  grade: number;

  @CreateApiPropertyDoc('级')
  @Rule(RuleType.number().min(1).max(2))
  prom: number;
}
