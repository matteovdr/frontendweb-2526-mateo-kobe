import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';

describe('Leden Routes (Current API Surface)', () => {
  let app: INestApplication;

  const url = '/api/leden';

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 404 for GET /api/leden', async () => {
    const res = await request(app.getHttpServer()).get(url);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Cannot GET /api/leden');
  });

  it('should return 404 for CRUD detail routes', async () => {
    const getRes = await request(app.getHttpServer()).get(`${url}/1`);
    const postRes = await request(app.getHttpServer()).post(url).send({ persoonId: 17, ageGroup: 'Sloebers' });
    const putRes = await request(app.getHttpServer()).put(`${url}/1`).send({ persoonId: 17, ageGroup: 'Sloebers' });
    const deleteRes = await request(app.getHttpServer()).delete(`${url}/1`);

    expect(getRes.statusCode).toBe(404);
    expect(postRes.statusCode).toBe(404);
    expect(putRes.statusCode).toBe(404);
    expect(deleteRes.statusCode).toBe(404);
  });
});
