export { NpmPkg } from '@waiting/shared-types';

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
