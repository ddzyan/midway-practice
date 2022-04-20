import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
export class CreateClassroomInput {
  @ApiProperty({
    type: 'integer',
    example: '1',
    description: '年',
  })
  @Rule(RuleType.number().min(1).max(2))
  grade: number;
  @ApiProperty({
    type: 'integer',
    example: '1',
    description: '级',
  })
  @Rule(RuleType.number().min(1).max(2))
  prom: number;
}
