import { Provide, Inject } from '@midwayjs/decorator';
import * as svgCaptcha from 'svg-captcha';
import * as _ from 'lodash';
import { JwtService } from '@midwayjs/jwt';

import MyError from '../../../app/comm/myError';
import { Redis } from '../../comm/redis';
import { Utils } from '../../comm/utils';
import { BaseService } from '../../../core/baseService';
import { LoginImageCaptchaDto } from '../../model/dto/verify';
import { IImageCaptchaResult } from '../../../interface';
import { AdminLoginDTO } from '../../../app/model/dto/admin';
import Crypto from '../../../app/comm/crypto';

enum ADMIN_STATUS {
  NORMAL = 1,
  BAN = -1,
}

@Provide()
export class AdminVerifyService extends BaseService {
  @Inject()
  redis: Redis;

  @Inject()
  utils: Utils;

  @Inject()
  private crypto: Crypto;

  @Inject()
  private jwtService: JwtService;

  async getImgCaptcha(
    captcha: LoginImageCaptchaDto
  ): Promise<IImageCaptchaResult> {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: _.isEmpty(captcha.width) ? 100 : captcha.width,
      height: _.isEmpty(captcha.height) ? 50 : captcha.height,
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64'
      )}`,
      id: this.utils.getRandom(4, 'numeric'),
    };
    // 10分钟过期时间
    await this.redis.setValue(
      `admin:captcha:img:${result.id}`,
      svg.text,
      60 * 10
    );
    return result;
  }

  async checkImgCaptcha(id: string, code: string): Promise<boolean> {
    const result = await this.redis.getString(`admin:captcha:img:${id}`);
    if (_.isEmpty(result)) {
      return false;
    }
    if (code.toLowerCase() !== result!.toLowerCase()) {
      return false;
    }
    // 校验成功后移除验证码
    await this.redis.delKey(`admin:captcha:img:${id}`);
    return true;
  }

  /**
   * @description 管理员
   * @param param
   */
  async login(param: AdminLoginDTO) {
    const { account, pwd } = param;
    const admin = await this.mapping.findOne({
      account,
    });
    if (!admin) {
      throw new MyError('用户不存在');
    }

    if (admin.status === ADMIN_STATUS.BAN) {
      throw new MyError('账户未激活或被禁用');
    }
    const correct = this.crypto.compareSync(pwd, admin.pwd);
    if (!correct) {
      throw new MyError('密码错误');
    }

    const token = await this.jwtService.sign({
      userId: admin.adminId,
      email: '',
      type: 1,
    });

    return {
      token,
      account,
    };
  }
}
