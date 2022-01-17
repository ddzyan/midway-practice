import * as dayjs from 'dayjs';
import * as _ from 'lodash';

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
