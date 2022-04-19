import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
export class CreateUserInput {
  @ApiProperty({
    type: 'string',
    description: '姓',
  })
  @Rule(RuleType.string().optional().min(1).max(2))
  firstName: string;

  @ApiProperty({ type: 'string', description: '名字' })
  @Rule(RuleType.string().optional().min(1).max(3))
  lastName: string;

  @ApiProperty({ type: 'integer', example: '1', description: '班级id' })
  @Rule(RuleType.number().required())
  classroomId: number;
}
