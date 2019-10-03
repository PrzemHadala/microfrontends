import { Test, TestingModule } from '@nestjs/testing';
import { applyMiddlewares } from '../src/main'

export async function getApp (nestModule) {
  let app
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [nestModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  applyMiddlewares(app)
  await app.init();
  app = app.getHttpServer()

  return app
}