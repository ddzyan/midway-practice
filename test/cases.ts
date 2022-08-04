import { EMAIL_TYPE } from '../src/app/constant/email';

const toEmailAddress = 'bill@greaterheat.com';

export default [
  {
    name: 'should withdraw failure',
    options: {
      emailType: EMAIL_TYPE.WITHDRAW_FAILURE,
      toEmailAddress,
      replaceContent: {
        content: 'this is error Message',
      },
    },
    check: false,
  },
  {
    name: 'should register',
    options: {
      emailType: EMAIL_TYPE.REGISTER,
      toEmailAddress,
      cacheValue: '1',
    },
    check: true,
  },
  {
    name: 'should invitation',
    options: {
      emailType: EMAIL_TYPE.INVITATION,
      toEmailAddress,
      replaceContent: {
        recommendCode: '1234',
      },
    },
    check: false,
  },
  {
    name: 'should subordinates create',
    options: {
      emailType: EMAIL_TYPE.SUBORDINATES_CREATE,
      toEmailAddress,
      cacheValue: '1',
    },
    check: true,
  },
];
