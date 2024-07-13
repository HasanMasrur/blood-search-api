import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.use(json({ limit: '5mb' }));
  app.setGlobalPrefix('api');
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
