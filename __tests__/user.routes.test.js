const request = require('supertest');
const express = require('express');

jest.mock('../controllers/user', () => ({
  getAllUsers: (req, res) => res.status(200).json([{ _id: 'u1' }]),
  getUserById: (req, res) => res.status(200).json({ _id: req.params.id }),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
}));

const userRouter = require('../routes/user');

const app = express();
app.use('/user', userRouter);

describe('User GET routes', () => {
  test('GET /user returns all users', async () => {
    const res = await request(app).get('/user');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ _id: 'u1' }]);
  });

  test('GET /user/:id returns a user', async () => {
    const res = await request(app).get('/user/abc123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ _id: 'abc123' });
  });
});
