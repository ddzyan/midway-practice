import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class CreateUserInput {
  @CreateApiPropertyDoc('用户姓')
  @Rule(RuleType.string().optional().min(1).max(2))
  firstName: string;

  @CreateApiPropertyDoc('用户名')
  @Rule(RuleType.string().optional().min(1).max(3))
  lastName: string;

  @CreateApiPropertyDoc('班级id')
  @Rule(RuleType.number().required())
  classroomId: number;
}
