import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'

import { AppModule } from './app.module'
import { ValidationPipe, INestApplication } from '@nestjs/common'

export function applyMiddlewares(app: INestApplication): INestApplication {
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  return app
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn']})
  applyMiddlewares(app)
  app.use(helmet())
  app.listen(3000)
}
bootstrap()
