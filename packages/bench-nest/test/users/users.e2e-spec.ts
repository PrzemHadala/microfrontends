import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { applyMiddlewares } from '../../src/main'

describe('Users (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyMiddlewares(app)
    await app.init();
    app = app.getHttpServer()
  });

  describe('CREATE', () => {
    it('fails validation', () => {
      return request(app)
        .post('/users/')
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
