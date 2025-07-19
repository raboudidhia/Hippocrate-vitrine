const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Mock nodemailer to avoid sending emails during tests
jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
    })),
}));

// Set test environment before importing the app
process.env.NODE_ENV = 'test';

const app = require('../server'); // Import app after setting NODE_ENV
const { Room, Reservation } = require('../models');

let mongoServer;

beforeAll(async () => {
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    // Create and connect to in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Create test rooms
    await Room.create([
        {
            name: 'Test Room 1',
            capacity: 10,
            availablePlaces: 10,
        },
        {
            name: 'Test Room 2',
            capacity: 20,
            availablePlaces: 20,
        },
    ]);
});

afterAll(async () => {
    // Clean up
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear reservations before each test
    await Reservation.deleteMany({});
});

describe('GET /api/rooms', () => {
    it('should return 200 and rooms array', async () => {
        const res = await request(app).get('/api/rooms');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('POST /api/reservations', () => {
    it('should create a new reservation', async () => {
        // Get available rooms first
        const roomsRes = await request(app).get('/api/rooms');
        const room = roomsRes.body[0];

        const reservationData = {
            room: room._id,
            date: '2025-07-20',
            arrivalTime: '09:00',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
        };

        const res = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.reservation.firstName).toBe('John');
    });

    it('should return 400 for invalid room', async () => {
        const reservationData = {
            room: '507f1f77bcf86cd799439011', // Invalid room ID
            date: '2025-07-20',
            arrivalTime: '09:00',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
        };

        const res = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Room not found');
    });
});
