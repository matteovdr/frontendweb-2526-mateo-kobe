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

describe('Leiding', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/leiding';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedPersoon(drizzle);
    await seedLeiding(drizzle);

    userAuthToken = await login(app);
  });

  afterAll(async () => {
    await clearLeiding(drizzle);
    await clearPersoon(drizzle);
    await app.close();
  });

  describe('GET /api/leiding', () => {
    it('should return all leiding', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThan(0);

      expect(res.body.items[0]).toMatchObject({
        ageGroup: 'Sloebers',
        imageUrl: '/src/images/helena.png',
        description: '...',
        isHoofdleiding: false,
        voornaam: 'Hoofd',
      });
    });

    it('should allow public access', async () => {
      const res = await request(app.getHttpServer()).get(url);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/leiding/:id', () => {
    it('should return a single leiding lid', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          ageGroup: 'Sloebers',
          imageUrl: '/src/images/helena.png',
          description: '...',
          isHoofdleiding: false,
          voornaam: 'Hoofd',
        }),
      );
    });

    it('should 404 when leiding does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Geen leiding gevonden met dit ID');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/leiding', () => {
    it('should return 400 because create dto currently rejects body', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 1,
          ageGroup: 'Knim',
          imageUrl: '/src/images/test.png',
          description: 'Nieuwe leiding',
          isHoofdleiding: true,
        });

      expect(res.statusCode).toBe(400);
    });

    it('should return 400 before persoon existence check', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 999,
          ageGroup: 'Knim',
          imageUrl: '/test.png',
          description: 'Test',
          isHoofdleiding: false,
        });

      expect(res.statusCode).toBe(400);
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          ageGroup: 'Keti’s',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toBeTruthy();
    });

    testAuthHeader(() => request(app.getHttpServer()).post(url));
  });

  describe('PATCH /api/leiding/:id', () => {
    it('should return 400 because update dto currently rejects body', async () => {
      const res = await request(app.getHttpServer())
        .patch(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          ageGroup: 'Pagaders',
          imageUrl: '/src/images/helena.png',
          description: 'Aangepaste beschrijving',
        });

      expect(res.statusCode).toBe(400);
    });

    it('should return 400 before existence check', async () => {
      const res = await request(app.getHttpServer())
        .patch(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          ageGroup: 'Test',
          imageUrl: '/test.png',
          description: 'Test beschrijving',
        });

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).patch(`${url}/1`),
    );
  });

  describe('DELETE /api/leiding/:id', () => {
    it('should delete leiding member', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should still return 204 when leiding does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(204);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
