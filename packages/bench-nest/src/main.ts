import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'

import { AppModule } from './app.module'
import { ValidationPipe, INestApplication } from '@nestjs/common'
import { corsConfig } from './configs/cors'

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
  app.enableCors(corsConfig)
  app.listen(3000)
}
bootstrap()
