import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import { login, loginAdmin } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

import { DatabaseProvider, DrizzleAsyncProvider } from '../src/drizzle/drizzle.provider';
import { seedLeiding, clearLeiding } from './seeds/leiding';

describe('Personen', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;
  let adminAuthToken: string;

  const url = '/api/personen';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedLeiding(drizzle);

    // Login een gewone gebruiker en een admin (je kan hier je eerste HOOFDLEIDING gebruiken als admin)
    userAuthToken = await login(app);  // moet een LID/LEIDING token zijn
    adminAuthToken = await loginAdmin(app); // HOOFDLEIDING token
  });

  afterAll(async () => {
    await clearLeiding(drizzle);
    await app.close();
  });

  // ------------------------
  // GET /api/personen
  // ------------------------
  describe('GET /api/personen', () => {
    it('should return all personen', async () => {
      const res = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThan(0);

      expect(res.body.items[0]).toHaveProperty('voornaam');
      expect(res.body.items[0]).toHaveProperty('achternaam');
      expect(res.body.items[0]).toHaveProperty('roles');
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  // ------------------------
  // GET /api/personen/:id
  // ------------------------
  describe('GET /api/personen/:id', () => {
    it('should return a single persoon', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          voornaam: expect.any(String),
          achternaam: expect.any(String),
          roles: expect.any(Array),
        }),
      );
    });

    it('should 404 when persoon does not exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/999`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No persoon with this id exists');
    });

    it('should 400 with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(res.statusCode).toBe(400);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  // ------------------------
  // POST /api/personen
  // ------------------------
  describe('POST /api/personen', () => {
    it('should create a new persoon', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({
          voornaam: 'Test',
          achternaam: 'User',
          geboorteDatum: '2010-01-01',
          telefoon: '0499 11 22 33',
          email: 'test.person@gmail.com',
          password: '12345678',
          roles: ['LEIDING'],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.voornaam).toBe('Test');
      expect(res.body.roles).toContain('LEIDING');
    });

    it('should 400 when missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({ voornaam: 'Test' });

      expect(res.statusCode).toBe(400);
      expect(res.body.details.body).toHaveProperty('achternaam');
      expect(res.body.details.body).toHaveProperty('email');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({
        voornaam: 'Test',
        achternaam: 'User',
        geboorteDatum: '2010-01-01',
        telefoon: '0499 11 22 33',
        email: 'test.person@gmail.com',
        password: '12345678',
        roles: ['LEIDING'],
      }),
    );
  });

  // ------------------------
  // PUT /api/personen/:id
  // ------------------------
  describe('PUT /api/personen/:id', () => {
    it('should update an existing persoon', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({
          telefoon: '0499 99 99 99',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.telefoon).toBe('0499 99 99 99');
    });

    it('should 404 when persoon does not exist', async () => {
      const res = await request(app.getHttpServer())
        .put(`${url}/999`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({ telefoon: '0499 00 00 00' });

      expect(res.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({ telefoon: '0499 99 99 99' }),
    );
  });

  // ------------------------
  // DELETE /api/personen/:id
  // ------------------------
  describe('DELETE /api/personen/:id', () => {
    it('should delete persoon', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should 404 when persoon does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No persoon with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1`),
    );
  });
});
