const { PrismaClient } = require('../generated/prisma');
const parsingService = require('./parsing.service');
const prisma = new PrismaClient();

const processAndSave = async (fileBuffer) => {
    const processedData = parsingService.parseAndGroupData(fileBuffer);
    console.log(processedData)
    await prisma.$transaction(async (tx) => {
        for (const user of processedData) {

            const dbUser = await tx.user.upsert({
                where: { name: user.name },
                update: {
                    fileUserId: user.user_id
                },
                create: {
                    name: user.name,
                    fileUserId: user.user_id,
                },
            });

            for (const order of user.orders) {

                const dbOrder = await tx.order.upsert({
                    where: {
                        userId_fileOrderId: {
                            userId: dbUser.id,
                            fileOrderId: order.order_id,
                        }
                    },
                    update: {
                        total: parseFloat(order.total),
                        date: new Date(order.date),
                    },
                    create: {
                        fileOrderId: order.order_id,
                        total: parseFloat(order.total),
                        date: new Date(order.date),
                        userId: dbUser.id,
                    }
                });

                for (const product of order.products) {
                    await tx.product.upsert({
                        where: {
                            orderId_fileProductId: {
                                orderId: dbOrder.id,
                                fileProductId: product.product_id,
                            }
                        },
                        update: { value: parseFloat(product.value) },
                        create: {
                            fileProductId: product.product_id,
                            value: parseFloat(product.value),
                            orderId: dbOrder.id,
                        }
                    });
                }
            }
        }
    });
};

const findOrders = async (filters) => {
    const where = {}

    if (filters.orderId) {
        where.fileOrderId = parseInt(filters.orderId, 10);
    }
    if (filters.startDate) {
        where.date = { ...where.date, gte: new Date(filters.startDate) };
    }
    if (filters.endDate) {
        where.date = { ...where.date, lte: new Date(filters.endDate) };
    }

    const ordersFound = await prisma.order.findMany({
        where: where,
        include: { user: true, products: true },
        orderBy: { userId: 'asc' },
    })

    const usersMap = new Map();

    for (const order of ordersFound) {
        if (!usersMap.has(order.userId)) {
            usersMap.set(order.userId, {
                user_id: order.user.fileUserId,
                name: order.user.name,
                orders: [],
            });
        }

        const userFromMap = usersMap.get(order.userId);
        userFromMap.orders.push({
            order_id: order.fileOrderId,
            total: order.total.toFixed(2),
            date: order.date.toISOString().split('T')[0],
            products: order.products.map(product => ({
                product_id: product.fileProductId,
                value: product.value.toFixed(2),
            }))
        })
    }
    return Array.from(usersMap.values())
}

module.exports = {
    processAndSave, findOrders
};