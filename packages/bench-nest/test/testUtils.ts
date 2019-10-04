import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { applyMiddlewares } from '../src/main'

export async function getApp(nestModule) {
  let app
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [nestModule],
  }).compile()

  app = moduleFixture.createNestApplication()
  applyMiddlewares(app)
  await app.init()
  app = app.getHttpServer()

  return app
}

export async function createValidUser(app) {
  const password = 'pwd'
  const email = 'someUniqueEmail@x.com'

  await request(app)
    .post('/users/sign-up')
    .send({ name: 'name', email, password })
  const signInResp = await request(app)
    .post('/users/sign-in')
    .send({ email, password })
  const accessToken = signInResp.body.accessToken
  const authHeader = `Bearer ${signInResp.body.accessToken}`

  return { password, email, authHeader, accessToken}
}
