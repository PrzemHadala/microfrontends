import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication, ParseIntPipe } from '@nestjs/common';

export function applyMiddlewares (app: INestApplication): INestApplication {
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  return app
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  applyMiddlewares(app)
  app.listen(3000);
}
bootstrap();
