// const request = require('supertest');
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const app = require('../../app'); // Import aplikacji
// const Parrot = require('../../models/Parrot');
// const WeightingNotification = require('../../models/WeightingNotifications');
//
// let mongoServer;
// let token;
// let parrotId;
//
// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//
//     await mongoose.connect(uri);
//
//     // Rejestracja i logowanie użytkownika
//     await request(app).post('/users/register').send({
//         firstName: 'Test',
//         lastName: 'User',
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'password123',
//     });
//
//     const loginResponse = await request(app).post('/auth/login').send({
//         username: 'testuser',
//         password: 'password123',
//     });
//
//     token = loginResponse.body.token;
//
//     // Dodanie papugi
//     const parrot = await Parrot.create({
//         ownerId: new mongoose.Types.ObjectId(loginResponse.body.userId),
//         name: 'PapugaTest',
//         species: 'African Grey',
//         age: 4,
//         wingspan: 32,
//         food: 'Seeds',
//         lastVaccination: '2024-12-15',
//     });
//
//     parrotId = parrot._id;
// });
//
// afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongoServer.stop();
// });
//
// afterEach(async () => {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//         await collections[key].deleteMany({});
//     }
// });
//
// describe('Weighting Notifications Tests', () => {
//     it('should add a new weighting notification', async () => {
//         const response = await request(app)
//             .post(`/api/weightingNotifications/${parrotId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'Ważenie Papugi',
//                 description: 'Test powiadomienia o ważeniu',
//                 type: 'one-time',
//                 date: '2025-01-25T00:00:00.000Z',
//                 hour: '10:00',
//             });
//
//         expect(response.status).toBe(201);
//         expect(response.body.notification).toHaveProperty('name', 'Ważenie Papugi');
//     });
//
//     it('should fetch weighting notifications for a user', async () => {
//         await WeightingNotification.create({
//             parrotId: parrotId,
//             ownerId: new mongoose.Types.ObjectId(token.userId),
//             name: 'Ważenie Papugi',
//             description: 'Test powiadomienia o ważeniu',
//             type: 'one-time',
//             date: '2025-01-25T00:00:00.000Z',
//             hour: '10:00',
//         });
//
//         const response = await request(app)
//             .get(`/api/weightingNotifications/${parrotId}`)
//             .set('Authorization', `Bearer ${token}`);
//
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//         expect(response.body.length).toBe(1);
//     });
//
//     it('should delete a weighting notification', async () => {
//         const notification = await WeightingNotification.create({
//             parrotId: parrotId,
//             ownerId: new mongoose.Types.ObjectId(token.userId),
//             name: 'Ważenie Papugi',
//             description: 'Test powiadomienia o ważeniu',
//             type: 'one-time',
//             date: '2025-01-25T00:00:00.000Z',
//             hour: '10:00',
//         });
//
//         const response = await request(app)
//             .delete(`/api/weightingNotifications/${parrotId}/${notification._id}`)
//             .set('Authorization', `Bearer ${token}`);
//
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Notification deleted successfully');
//     });
// });
