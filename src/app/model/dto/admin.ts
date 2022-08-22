import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class AdminLoginDTO {
  @ApiProperty({
    type: 'string',
    description: '账号',
    example: 'admin',
  })
  @Rule(RuleType.string().required())
  account: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
    example: '123456',
  })
  @Rule(RuleType.string().required())
  pwd: string;
}
