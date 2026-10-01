const request = require('supertest');
const app = require('../src/server');

describe('GET /api/status', () => {
  it('should return 200 and system status', async () => {
    const response = await request(app).get('/api/status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('timestamp');
  });
});
