export { NpmPkg } from '@waiting/shared-types';
import { UserContext } from './app/comm/userContext';

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

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
