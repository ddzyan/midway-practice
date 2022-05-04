import {
  IMidwayWebApplication as Application,
  IMidwayWebContext as Context,
  IMidwayWebNext,
  NextFunction,
} from '@midwayjs/web';

export { NpmPkg } from '@waiting/shared-types';

export { Application, Context, IMidwayWebNext, NextFunction };

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
