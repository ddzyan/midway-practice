import { Controller, Get, Provide } from '@midwayjs/decorator';

@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }
}
