import { Provide, Inject, Init } from '@midwayjs/decorator';
import { Clients } from '@midwayjs/grpc';

import { IGetVerificationCode, ISendEmailParam } from '../../interface';
import { email } from '../../domain/email';

@Provide()
export class EmailService {
  @Inject()
  private grpcClients: Clients;

  private emailGrpcService: email.EmailClient;

  @Init()
  async init() {
    // 赋值一个服务实例
    this.emailGrpcService =
      this.grpcClients.getService<email.EmailClient>('email.Email');
  }

  // 发送邮件
  async sendEmail(param: ISendEmailParam): Promise<string> {
    const { emailType, toEmailAddress, replaceContent, cacheValue } = param;
    const result = await this.emailGrpcService.sendEmail().sendMessage({
      emailType,
      toEmailAddress,
      replaceContent,
      cacheValue,
    });

    // 返回结果
    return result.code;
  }

  // 获取验证码
  async getVerificationCode(param: IGetVerificationCode): Promise<string> {
    const { emailType, cacheValue } = param;
    const result = await this.emailGrpcService
      .getVerificationCode()
      .sendMessage({
        emailType,
        cacheValue,
      });

    // 返回结果
    return result.code;
  }
}
