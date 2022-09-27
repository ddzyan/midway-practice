import { Provide, Scope, ScopeEnum, Inject } from '@midwayjs/decorator';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';
import * as dayjs from 'dayjs';
import * as randomstring from 'randomstring';
import { Context } from '@midwayjs/koa';
import * as ipdb from 'ipip-ipdb';

const DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss';

@Provide()
@Scope(ScopeEnum.Singleton)
export default class Utils {
  @Inject()
  baseDir;

  // 获得请求IP
  getReqIP(ctx: Context) {
    const req: any = ctx.req;
    return (
      req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
    ).replace('::ffff:', '');
  }

  // 根据IP获得请求地址
  async getIpAddr(ctx: Context, ip?: string | string[]) {
    try {
      if (!ip) {
        ip = await this.getReqIP(ctx);
      }
      const bst = new ipdb.BaseStation(
        `${this.baseDir}/app/comm/ipipfree.ipdb`
      );
      const result = bst.findInfo(ip, 'CN');
      const addArr: any = [];
      if (result) {
        addArr.push(result.countryName);
        addArr.push(result.regionName);
        addArr.push(result.cityName);
        return _.uniq(addArr).join('');
      }
    } catch (err) {
      return '无法获取地址信息';
    }
  }

  // 线程阻塞毫秒数
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getRandom(length = 15, charset = 'alphabetic') {
    const randomString = randomstring.generate({
      length,
      charset,
    });
    return randomString;
  }

  isEmpty(value?) {
    return _.isEmpty(value);
  }

  isNotEmpty(value?) {
    return !_.isEmpty(value);
  }

  getDateNow(): string {
    const dateStr: string = dayjs().format(DATE_FORMATE);
    return dateStr;
  }

  getDateEndTime(time?): string {
    return dayjs(time).endOf('day').format(DATE_FORMATE);
  }

  getDateStartTime(time?): string {
    return dayjs(time).startOf('day').format(DATE_FORMATE);
  }

  getDateSeconds(time?): number {
    return dayjs(time).unix();
  }

  getDateNowAdd8hours(time?): Date {
    const dateStr: Date = dayjs(time).add(8, 'hour').toDate();
    return dateStr;
  }

  bigEq(a, b) {
    return new BigNumber(a).eq(b);
  }

  mapToArray(map: Map<string, any>) {
    const arr = [];
    for (const [key, value] of map) {
      arr.push({
        [key]: value,
      });
    }

    return arr;
  }

  mapToObject(map: Map<string, any>) {
    const obj = {};
    for (const [key, value] of map) {
      obj[key] = value;
    }
    return obj;
  }

  objectToMap(obj: object) {
    const map = new Map();
    for (const key in obj) {
      map.set(key, obj[key]);
    }
    return map;
  }
}
