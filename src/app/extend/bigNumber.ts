import BigNumber from 'bignumber.js';

type IArgs = string[] | number[];

export function bigAdd(...args: IArgs): BigNumber {
  let res = new BigNumber(0);
  for (const item of args) {
    res = new BigNumber(item).plus(res);
  }

  return res;
}

export function bigMinus(...args: IArgs): BigNumber {
  let res = new BigNumber(0);
  for (const item of args) {
    res = new BigNumber(item).minus(res);
  }

  return res;
}

export function bigMultiply(...args: IArgs): BigNumber {
  if (
    args.some(
      item => Number.parseInt(item) === 0 || Number.parseInt(item) === NaN
    )
  ) {
    return new BigNumber(0);
  }

  let res = new BigNumber(0);
  for (const item of args) {
    res = new BigNumber(item).multipliedBy(res);
  }

  return res;
}

export function bigDiv(...args: IArgs): BigNumber {
  if (
    args.some(
      item => Number.parseInt(item) === 0 || Number.parseInt(item) === NaN
    )
  ) {
    return new BigNumber(0);
  }

  let res = new BigNumber(0);
  for (const item of args) {
    res = new BigNumber(item).dividedBy(res);
  }

  return res;
}
