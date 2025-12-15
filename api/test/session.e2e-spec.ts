import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { seedPersoon, clearPersoon } from './seeds/personen';

describe('Sessions', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  const url = '/api/sessions';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    // eerst leegmaken, dan seeden, en gebruik dezelfde drizzle instance
    await clearPersoon(drizzle);
    await seedPersoon(drizzle);
  });

  afterAll(async () => {
    await clearPersoon(drizzle);
    await app.close();
  });

  describe('POST /api/sessions', () => {
    it('should 200 and return the token when succesfully logged in', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        email: 'hoofd.leiding@test.be', 
        password: '12345678',
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeTruthy();
    });

    it('should 401 with wrong email', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        email: 'invalid@hogent.be',
        password: '12345678',
      });

      expect(response.statusCode).toBe(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'The given email and password do not match',
      });
    });

    it('should 401 with wrong password', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        email: 'hoofd.leiding@test.be', // geldig e‑mail
        password: 'invalidpassword',    // verkeerde password
      });

      expect(response.statusCode).toBe(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'The given email and password do not match',
      });
    });

    it('should 400 with invalid email', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        email: 'invalid',
        password: '12345678',
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('email');
    });

    it('should 400 when no password given', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ email: 'login@hogent.be' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('password');
    });

    it('should 400 when no email given', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ password: '12345678' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('email');
    });
  });
});
