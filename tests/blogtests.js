const request = require('supertest');
const app = require('../index');

describe('Blog API', () => {
  it('should fetch published blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
  });
});
