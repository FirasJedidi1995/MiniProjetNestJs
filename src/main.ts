import { NestFactory } from '@nestjs/core';
//import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config/dist/config.service';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const configService = app.get(ConfigService);
  const corsOptions = { origin: ['http://localhost:4200'] };
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.use((req: Request, res: Response, next) => {
    console.log('Middleware from app.use');
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new DurationInterceptor());

  const config = new ConfigService()
  await app.listen(config.get("APP_PORT"));
  // await app.listen(3000);
}
bootstrap();
