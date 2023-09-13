import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getHello(): string {
    return this.config.get('DB_USERNAME');
  }
}
