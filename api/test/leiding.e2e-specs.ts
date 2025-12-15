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
        beschrijving: '...',
        isHoofdleiding: false,
        persoon: {
          id: 1,
        },
      });
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
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
          beschrijving: '...',
          isHoofdleiding: false,
          persoon: {
            id: 1,
          },
        }),
      );
    });

    it('should 404 when leiding does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No leiding with this id exists');
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
    it('should create a new leiding member', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 1,
          ageGroup: 'Knim',
          imageUrl: '/src/images/test.png',
          beschrijving: 'Nieuwe leiding',
          isHoofdleiding: true,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.ageGroup).toBe('Knim');
      expect(res.body.isHoofdleiding).toBe(true);
    });

    it('should 404 when persoon does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 999,
          ageGroup: 'Knim',
          imageUrl: '/test.png',
          beschrijving: 'Test',
          isHoofdleiding: false,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No persoon with this id exists');
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          ageGroup: 'Keti’s',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('persoonId');
    });

    testAuthHeader(() => request(app.getHttpServer()).post(url));
  });

  describe('PUT /api/leiding/:id', () => {
    it('should update a leiding member', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 1,
          ageGroup: 'Pagaders',
          imageUrl: '/src/images/helena.png',
          beschrijving: 'Aangepast',
          isHoofdleiding: true,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.ageGroup).toBe('Pagaders');
      expect(res.body.isHoofdleiding).toBe(true);
    });

    it('should 404 when leiding does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          persoonId: 1,
          ageGroup: 'Test',
          imageUrl: '/test.png',
          beschrijving: 'Test',
          isHoofdleiding: false,
        });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`),
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

    it('should 404 when leiding does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No leiding with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
