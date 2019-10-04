import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getApp, createValidUser } from '../testUtils'

describe('Users (e2e)', () => {
  let app;

  beforeEach(async () => {
    app = await getApp(AppModule)
  });

  describe('/sing-up/', () => {
    it('fails validation', () => {
      return request(app)
        .post('/users/sign-up')
        .send({ name: '1', password: 'tet', email: 'wrongEmail' })
        .expect(400)
    });
    it('fails, beacause user already exist', async () => {
      await request(app)
        .post('/users/sign-up')
        .send({ name: 'name', email: 'test1@x.com', password: 'pwd' })
        .expect(201)

      return request(app)
        .post('/users/sign-up')
        .send({ name: 'name', email: 'test1@x.com', password: 'pwd' })
        .expect(400)
        .expect(res => res.body.message.includes('already exist'))
    });
    it('should create user', () => {
      return request(app)
        .post('/users/sign-up')
        .send({ name: 'name', email: 'uniqueEmail@x.com', password: 'pwd' })
        .expect(201)
    });
  });
  describe('/sign-in/', () => {
    const password = 'pwd'
    const email = 'singIn@x.com'
    it('fails when password is wrong', async () => {
      await request(app)
        .post('/users/sign-up')
        .send({ name: 'name', email, password })
        .expect(201)
      return request(app)
        .post('/users/sign-in')
        .send({ email, password: 'wrongPwd' })
        .expect(401)
    });
    it('success when password is correct', async () => {
      await request(app)
        .post('/users/sign-up')
        .send({ name: 'name', email, password })
        .expect(201)
      const response = await request(app)
        .post('/users/sign-in')
        .send({ email, password })
        .expect(200)
      expect(response.body).toHaveProperty('accessToken')
    });
  });
  describe('JWT works', () => {
    it('should block invalid user', async () => {
      await request(app)
        .get('/users/')
        .set('Authorization', 'authHeader')
        .expect(401)
    })
    it('should authorize valid user', async () => {
      const { authHeader } = await createValidUser(app)
      await request(app)
        .get('/users/')
        .set('Authorization', authHeader)
        .expect(200)
    })
  })
});
