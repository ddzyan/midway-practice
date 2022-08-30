import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class LoginImageCaptchaDto {
  @ApiProperty({ type: 'number', description: '验证码宽度', example: 100 })
  @Rule(RuleType.number().integer())
  @Expose()
  width: number;

  @ApiProperty({ type: 'number', description: '验证码高度', example: 50 })
  @Rule(RuleType.number().integer())
  @Expose()
  height: number;
}
