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

module.exports = {
    processAndSave
};