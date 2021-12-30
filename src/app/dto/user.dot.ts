import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class CreateUserInput {
  @CreateApiPropertyDoc('用户邮箱')
  @Rule(RuleType.string().email().required().min(2).max(30))
  email: string;

  @CreateApiPropertyDoc('用户姓名')
  @Rule(RuleType.string().optional().min(2).max(10))
  name?: string;
}
