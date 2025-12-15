import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import { login } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';

import { seedPersoon, clearPersoon } from './seeds/personen';
import { seedLeiding, clearLeiding } from './seeds/leiding';
import { seedKampen, clearKampen } from './seeds/kampen';
import { seedLeidingKamp, clearLeidingKamp } from './seeds/leidingKamp';

describe('LeidingKamp', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/leiding-kamp';

  beforeAll(async () => {
  app = await createTestApp();
  drizzle = app.get(DrizzleAsyncProvider);


  await clearLeidingKamp(drizzle);
  await clearLeiding(drizzle);
  await clearKampen(drizzle);
  await clearPersoon(drizzle);


  await seedPersoon(drizzle);
  await seedLeiding(drizzle);     
  await seedKampen(drizzle);       
  await seedLeidingKamp(drizzle);

  userAuthToken = await login(app);
});

  afterAll(async () => {
    await clearLeidingKamp(drizzle);
    await clearLeiding(drizzle);
    await clearKampen(drizzle);
    await clearPersoon(drizzle);
    await app.close();
  });

  describe('GET /api/leiding-kamp', () => {
    it('should return all leiding-kamp relations', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThan(0);

      expect(res.body.items[0]).toMatchObject({
        leidingId: 1,
        kampId: 1,
      });
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/leiding-kamp/:id', () => {
    it('should return a single leiding-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          leidingId: 1,
          kampId: 1,
        }),
      );
    });

    it('should 404 when relation does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No leiding-kamp relation with this id exists');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/leiding-kamp', () => {
    it('should create a new leiding-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          leidingId: 1,
          kampId: 2,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.leidingId).toBe(1);
      expect(res.body.kampId).toBe(2);
    });

    it('should 404 when leiding or kamp does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          leidingId: 999,
          kampId: 999,
        });

      expect(res.statusCode).toBe(404);
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ leidingId: 1 });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('kampId');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({ leidingId: 1, kampId: 2 }),
    );
  });

  describe('PUT /api/leiding-kamp/:id', () => {
    it('should update an existing leiding-kamp relation', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          leidingId: 1,
          kampId: 2,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.leidingId).toBe(1);
      expect(res.body.kampId).toBe(2);
    });

    it('should 404 when relation does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          leidingId: 1,
          kampId: 2,
        });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({ leidingId: 1, kampId: 2 }),
    );
  });

  describe('DELETE /api/leiding-kamp/:id', () => {
    it('should delete a leiding-kamp relation', async () => {
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
      expect(res.body.message).toBe('No leiding-kamp relation with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
