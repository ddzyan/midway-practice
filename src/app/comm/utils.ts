import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';
import * as dayjs from 'dayjs';
import * as randomstring from 'randomstring';

const DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss';

@Provide()
@Scope(ScopeEnum.Singleton)
export default class Utils {
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
