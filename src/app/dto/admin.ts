import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class AdminLoginDTO {
  @ApiProperty({
    type: 'string',
    description: '账号',
  })
  @Rule(RuleType.string().required())
  account: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
  })
  @Rule(RuleType.string().required())
  pwd: string;
}
