const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/usermodels');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI,

    );
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/users/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/api/users/signup').send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User created successfully');
    });

    it('should not allow duplicate emails', async () => {
      await request(app).post('/api/users/signup').send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/users/signup').send({
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'johndoe@example.com',
        password: 'password456',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Email already exists');
    });
  });

  describe('POST /api/users/signin', () => {
    beforeEach(async () => {
      await request(app).post('/api/users/signup').send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });
    });

    it('should sign in a user with valid credentials', async () => {
      const res = await request(app).post('/api/users/signin').send({
        email: 'johndoe@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should not sign in a user with invalid credentials', async () => {
      const res = await request(app).post('/api/users/signin').send({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should not sign in a non-existent user', async () => {
      const res = await request(app).post('/api/users/signin').send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });
});
