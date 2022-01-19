import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';

const DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss';

export function isEmpty(value?) {
  return _.isEmpty(value);
}

export function isNotEmpty(value?) {
  return !_.isEmpty(value);
}

export function getDateNow(): string {
  const dateStr: string = dayjs().format(DATE_FORMATE);
  return dateStr;
}

export function getDateEndTime(time?): string {
  return dayjs(time).endOf('day').format(DATE_FORMATE);
}

export function getDateStartTime(time?): string {
  return dayjs(time).startOf('day').format(DATE_FORMATE);
}

export function getDateSeconds(time?): number {
  return dayjs(time).unix();
}

export function getDateNowAdd8hours(time?): Date {
  const dateStr: Date = dayjs(time).add(8, 'hour').toDate();
  return dateStr;
}

export function bigEq(a, b) {
  return new BigNumber(a).eq(b);
}

export function mapToArray(map: Map<string, any>) {
  const arr = [];
  for (const [key, value] of map) {
    arr.push({
      [key]: value,
    });
  }

  return arr;
}

export function mapToObject(map: Map<string, any>) {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

export function objectToMap(obj: object) {
  const map = new Map();
  for (const key in obj) {
    map.set(key, obj[key]);
  }
  return map;
}
