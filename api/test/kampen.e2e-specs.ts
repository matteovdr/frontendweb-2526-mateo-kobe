import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import { login } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';

import { seedKampen, clearKampen } from './seeds/kampen';
import { seedPersoon, clearPersoon } from './seeds/personen';

describe('Kampen', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/kampen';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedPersoon(drizzle);
    await seedKampen(drizzle);

    userAuthToken = await login(app);
  });

  afterAll(async () => {
    await clearKampen(drizzle);
    await clearPersoon(drizzle);
    await app.close();
  });

  describe('GET /api/kampen', () => {
    it('should return all kampen', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBe(2);

      expect(res.body.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            naam: 'Stadskamp Brussel Atomium',
            stad: 'Brussel',
          }),
          expect.objectContaining({
            id: 2,
            naam: 'Zomerkamp Kortrijk aan Zee',
            stad: 'Kortrijk',
          }),
        ]),
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/kampen/:id', () => {
    it('should return a single kamp', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        naam: 'Stadskamp Brussel Atomium',
        stad: 'Brussel',
        beschrijving: 'Beschrijving wordt later toegevoegd.',
        startDatum: new Date('2025-04-07').toISOString(),
        eindDatum: new Date('2025-04-13').toISOString(),
      });
    });

    it('should 404 when kamp does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No kamp with this id exists');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/kampen', () => {
    it('should create a new kamp', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          naam: 'Herfstkamp Gent',
          stad: 'Gent',
          beschrijving: 'Leuk kamp!',
          startDatum: '2025-10-01',
          eindDatum: '2025-10-07',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.naam).toBe('Herfstkamp Gent');
      expect(res.body.stad).toBe('Gent');
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          stad: 'Gent',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('naam');
    });

    testAuthHeader(() => request(app.getHttpServer()).post(url));
  });

  describe('PUT /api/kampen/:id', () => {
    it('should update an existing kamp', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          naam: 'Stadskamp Brussel Centrum',
          stad: 'Brussel',
          beschrijving: 'Aangepast',
          startDatum: '2025-04-07',
          eindDatum: '2025-04-13',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.naam).toBe('Stadskamp Brussel Centrum');
    });

    it('should 404 when kamp does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          naam: 'Test',
          stad: 'Test',
          startDatum: '2025-01-01',
          eindDatum: '2025-01-02',
        });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`),
    );
  });

  describe('DELETE /api/kampen/:id', () => {
    it('should delete a kamp', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(204);
    });

    it('should 404 when kamp does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
