import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import { login } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';

import { seedLid, clearLid } from './seeds/lid';
import { seedKampen, clearKampen } from './seeds/kampen';
import { seedLidKamp, clearLidKamp } from './seeds/lidKamp';

describe('LidKamp', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/lid-kamp';

beforeAll(async () => {
  app = await createTestApp();
  drizzle = app.get(DrizzleAsyncProvider);

  await clearLidKamp(drizzle);
  await clearLid(drizzle);
  await clearKampen(drizzle);

  await seedKampen(drizzle);
  await seedLid(drizzle);
  await seedLidKamp(drizzle);

  userAuthToken = await login(app);
});

  afterAll(async () => {
    await clearLidKamp(drizzle);
    await clearLid(drizzle);
    await clearKampen(drizzle);
    await app.close();
  });

  describe('GET /api/lid-kamp', () => {
    it('should return all lid-kamp relations', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThan(0);

      expect(res.body.items[0]).toMatchObject({
        lidId: 17,
        kampId: 1,
      });
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/lid-kamp/:id', () => {
    it('should return a single lid-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          lidId: 17,
          kampId: 1,
        }),
      );
    });

    it('should 404 when relation does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No lid-kamp relation with this id exists');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/lid-kamp', () => {
    it('should create a new lid-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          lidId: 18,
          kampId: 1,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.lidId).toBe(18);
      expect(res.body.kampId).toBe(1);
    });

    it('should 404 when lid or kamp does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          lidId: 999,
          kampId: 999,
        });

      expect(res.statusCode).toBe(404);
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ lidId: 17 });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('kampId');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({ lidId: 17, kampId: 1 }),
    );
  });

  describe('PUT /api/lid-kamp/:id', () => {
    it('should update an existing lid-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          lidId: 17,
          kampId: 2,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.lidId).toBe(17);
      expect(res.body.kampId).toBe(2);
    });

    it('should 404 when relation does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          lidId: 17,
          kampId: 2,
        });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({ lidId: 17, kampId: 2 }),
    );
  });

  describe('DELETE /api/lid-kamp/:id', () => {
    it('should delete lid-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should 404 when relation does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No lid-kamp relation with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
