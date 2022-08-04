import { relative } from 'path';

import { testConfig } from '../root.config';
import cases from '../cases';
import { EmailService } from '../../src/app/service/email';

const filename = relative(process.cwd(), __filename).replace(/\\/gu, '/');
describe.skip(filename, () => {
  cases.forEach(esac => {
    it(esac.name, async () => {
      const emailService = await testConfig.app
        .getApplicationContext()
        .getAsync<EmailService>(EmailService);
      const code = await emailService.sendEmail(esac.options);
      if (!esac.check) {
        expect(true).toBeTruthy();
      } else {
        const result = await emailService.getVerificationCode({
          emailType: esac.options.emailType,
          cacheValue: code,
        });

        expect(!!result).toBeTruthy();
      }
    });
  });
});
