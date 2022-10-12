import { Processor, IProcessor } from '@midwayjs/bull';

@Processor('task', {
  repeat: {
    cron: '* * * * * *',
  },
})
export class TestProcessor implements IProcessor {
  execute(data: any) {
    console.log('hello word');
  }
}
