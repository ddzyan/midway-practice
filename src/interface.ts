export { NpmPkg } from '@waiting/shared-types';
import { EMAIL_TYPE } from './app/constant/email';
/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  id: number;
  name: string | null;
  email: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions[];
}

export interface IAccessLogConfig {
  ignore: RegExp[];
}

export interface ISendEmailParam {
  emailType: EMAIL_TYPE;
  toEmailAddress: string;
  cacheValue?: string;
  content?: string;
  replaceContent?: any;
}

export interface IGetVerificationCode {
  emailType: EMAIL_TYPE;
  cacheValue?: string;
}
