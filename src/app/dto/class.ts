import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
export class CreateClassroomDTO {
  @ApiProperty({
    type: 'integer',
    example: '1',
    description: '年',
  })
  @Rule(RuleType.number().min(1).max(20).required())
  grade: number;

  @ApiProperty({
    type: 'integer',
    example: '1',
    description: '级',
  })
  @Rule(RuleType.number().min(1).max(20).required())
  prom: number;
}
