const request = require('supertest');
const express = require('express');

jest.mock('../controllers/vehicle', () => ({
  getAllVehicles: (req, res) => res.status(200).json([{ _id: 'v1' }]),
  getVehicleById: (req, res) => res.status(200).json({ _id: req.params.id }),
  createVehicle: jest.fn(),
  updateVehicle: jest.fn(),
  deleteVehicle: jest.fn()
}));

const vehicleRouter = require('../routes/vehicle');

const app = express();
app.use('/vehicle', vehicleRouter);

describe('Vehicle GET routes', () => {
  test('GET /vehicle returns all vehicles', async () => {
    const res = await request(app).get('/vehicle');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: 'v1' }]);
  });

  test('GET /vehicle/:id returns a vehicle', async () => {
    const res = await request(app).get('/vehicle/abc123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ _id: 'abc123' });
  });
});
