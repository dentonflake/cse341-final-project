const request = require('supertest');
const express = require('express');

jest.mock('../controllers/service', () => ({
  getAllServices: (req, res) => res.status(200).json([{ _id: 's1' }]),
  getServiceById: (req, res) => res.status(200).json({ _id: req.params.id }),
  createService: jest.fn(),
  updateService: jest.fn(),
  deleteService: jest.fn()
}));

const serviceRouter = require('../routes/service');

const app = express();
app.use('/service', serviceRouter);

describe('Service GET routes', () => {
  test('GET /service returns all services', async () => {
    const res = await request(app).get('/service');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: 's1' }]);
  });

  test('GET /service/:id returns a service', async () => {
    const res = await request(app).get('/service/abc123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ _id: 'abc123' });
  });
});
