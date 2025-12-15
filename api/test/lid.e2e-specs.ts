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
import { seedLid, clearLid } from './seeds/lid';

describe('Leden', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/leden';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

      await clearLid(drizzle);
  await clearPersoon(drizzle);

    await seedPersoon(drizzle);
    await seedLid(drizzle);

    userAuthToken = await login(app);
  });

  afterAll(async () => {
    await clearLid(drizzle);
    await clearPersoon(drizzle);
    await app.close();
  });

  describe('GET /api/leden', () => {
    it('should return all leden', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThan(0);

      expect(res.body.items[0]).toMatchObject({
        persoonId: 17,
        ageGroup: 'Sloebers',
      });
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/leden/:id', () => {
    it('should return a single lid', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          persoonId: 17,
          ageGroup: 'Sloebers',
        }),
      );
    });

    it('should 404 when lid does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No lid with this id exists');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/leden', () => {
    it('should create a new lid', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 18,
          ageGroup: 'Keti’s',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.persoonId).toBe(18);
      expect(res.body.ageGroup).toBe('Keti’s');
    });

    it('should 404 when persoon does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 999,
          ageGroup: 'Keti’s',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No persoon with this id exists');
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ ageGroup: 'Keti’s' });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('persoonId');
    });

    testAuthHeader(() => request(app.getHttpServer()).post(url));
  });

  describe('PUT /api/leden/:id', () => {
    it('should update an existing lid', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 17,
          ageGroup: 'Aspi’s',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.ageGroup).toBe('Aspi’s');
    });

    it('should 404 when lid does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 17,
          ageGroup: 'Test',
        });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({ persoonId: 17, ageGroup: 'Aspi’s' }),
    );
  });

  describe('DELETE /api/leden/:id', () => {
    it('should delete lid', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should 404 when lid does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No lid with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
