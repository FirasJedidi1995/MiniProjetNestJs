import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/first/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        'hello',
        {
          path: 'todo',
          method: RequestMethod.GET,
        },
        {
          path: 'todo*',
          method: RequestMethod.DELETE,
        },
      )
      .apply(logger)
      .forRoutes('')
      .apply(HelmetMiddleware)
      .forRoutes('');
  }
}
