import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getApp } from '../testUtils'

describe('Users (e2e)', () => {
  let app;

  beforeEach(async () => {
    app = await getApp(AppModule)
  });

  describe('/sing-up/', () => {
    it('fails validation', () => {
      return request(app)
        .post('/users/sign-up')
        .send({ name: '1' })
        .expect(400)
    });
    it('should create user', () => {
      return request(app)
        .post('/users/')
        .send({ name: 'name' })
        .expect(201)
    });
  });
  describe('GET', () => {
    it('fails validation', () => {
      return request(app)
      .get('/users/aaaa')
      .expect(400)
    });
    it('should get user', () => {
      return request(app)
      .get('/users/1')
      .expect(200)
    });
  });
});
