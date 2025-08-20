const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('../../src/generated/prisma');

const prisma = new PrismaClient();

describe('API Integration Tests', () => {

    beforeEach(async () => {
        await prisma.product.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    const testFileContent = `0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308
0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116
0000000049                               Ken Wintheiser00000005230000000003      586.7420210903`;

    const expectedFullOutput = [
        {
            "user_id": 70,
            "name": "Palmer Prosacco",
            "orders": [
                {
                    "order_id": 753,
                    "total": "1836.74",
                    "date": "2021-03-08",
                    "products": [
                        {
                            "product_id": 3,
                            "value": "1836.74"
                        }
                    ]
                }
            ]
        },
        {
            "user_id": 75,
            "name": "Bobbie Batz",
            "orders": [
                {
                    "order_id": 798,
                    "total": "1578.57",
                    "date": "2021-11-16",
                    "products": [
                        {
                            "product_id": 2,
                            "value": "1578.57"
                        }
                    ]
                }
            ]
        },
        {
            "user_id": 49,
            "name": "Ken Wintheiser",
            "orders": [
                {
                    "order_id": 523,
                    "total": "586.74",
                    "date": "2021-09-03",
                    "products": [
                        {
                            "product_id": 3,
                            "value": "586.74"
                        }
                    ]
                }
            ]
        }
    ]

    it('should process an uploaded file', async () => {
        const uploadResponse = await request(app)
            .post('/api/upload')
            .attach('file', Buffer.from(testFileContent), 'test-data.txt');

        expect(uploadResponse.status).toBe(201);

        expect(uploadResponse.body).toEqual({ message: 'Arquivo processado com sucesso!' });
    });

    it('should process an uploaded file and return all orders', async () => {
        await request(app)
            .post('/api/upload')
            .attach('file', Buffer.from(testFileContent), 'test-data.txt');

        const fullGetResponse = await request(app).get('/api/orders');

        expect(fullGetResponse.status).toBe(200);

        expect(fullGetResponse.body).toEqual(expectedFullOutput);
    })

    it('should process an uploaded file and return filtered orders', async () => {
        await request(app)
            .post('/api/upload')
            .attach('file', Buffer.from(testFileContent), 'test-data.txt');

        const filteredGetResponse = await request(app).get('/api/orders?order_id=798');

        expect(filteredGetResponse.status).toBe(200);
        expect(filteredGetResponse.body).toHaveLength(1);
        expect(filteredGetResponse.body[0].name).toBe('Bobbie Batz');
        expect(filteredGetResponse.body[0].orders).toHaveLength(1);
        expect(filteredGetResponse.body[0].orders[0].order_id).toBe(798);

    })
});