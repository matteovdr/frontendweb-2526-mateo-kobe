import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';

describe('LidKamp Routes (Current API Surface)', () => {
  let app: INestApplication;

  const url = '/api/lid-kamp';

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 404 for GET /api/lid-kamp', async () => {
    const res = await request(app.getHttpServer()).get(url);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Cannot GET /api/lid-kamp');
  });

  it('should return 404 for CRUD detail routes', async () => {
    const getRes = await request(app.getHttpServer()).get(`${url}/1`);
    const postRes = await request(app.getHttpServer()).post(url).send({ lidId: 17, kampId: 1 });
    const putRes = await request(app.getHttpServer()).put(`${url}/1`).send({ lidId: 17, kampId: 1 });
    const deleteRes = await request(app.getHttpServer()).delete(`${url}/1`);

    expect(getRes.statusCode).toBe(404);
    expect(postRes.statusCode).toBe(404);
    expect(putRes.statusCode).toBe(404);
    expect(deleteRes.statusCode).toBe(404);
  });
});
