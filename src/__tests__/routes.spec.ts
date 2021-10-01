import request from 'supertest';
import app from '../index';

describe('Routes', () => {
  afterAll(() => {
    app.terminate();
  });

  test('/', async () => {
    const response = await request(app.callback()).get('/');

    expect(response.status).toBe(401);
  });

  test('/health', async () => {
    const response = await request(app.callback()).get('/health');

    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });
});
