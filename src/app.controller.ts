import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('hello')
  getHello(): string {
    console.log(this.configService.get('APP_PORT'));
    return this.appService.getHello();
  }
}
