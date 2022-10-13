import { Processor, IProcessor } from '@midwayjs/bull';

@Processor('task', {
  repeat: {
    cron: '*/5 * * * * *',
  },
})
export class TestProcessor implements IProcessor {
  execute(data: any) {
    console.log('hello word');
  }
}
