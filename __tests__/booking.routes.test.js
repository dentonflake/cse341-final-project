const request = require('supertest');
const express = require('express');

jest.mock('../controllers/booking', () => ({
  getAllBookings: (req, res) => res.status(200).json([{ _id: 'b1' }]),
  getBookingById: (req, res) => res.status(200).json({ _id: req.params.id }),
  createBooking: jest.fn(),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn()
}));

const bookingRouter = require('../routes/booking');

const app = express();
app.use('/booking', bookingRouter);

describe('Booking GET routes', () => {
  test('GET /booking returns all bookings', async () => {
    const res = await request(app).get('/booking');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: 'b1' }]);
  });

  test('GET /booking/:id returns a booking', async () => {
    const res = await request(app).get('/booking/abc123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ _id: 'abc123' });
  });
});
