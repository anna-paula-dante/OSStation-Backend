const parseAndGroupData = (fileBuffer) => {
    const lines = fileBuffer.toString('utf-8').split('\n').filter(line => line.length > 0);

    const userGroup = new Map();

    for (const line of lines) {
        const userId = parseInt(line.substring(0, 10), 10);
        const userName = line.substring(10, 55).trim();
        const orderId = parseInt(line.substring(55, 65), 10);
        const productId = parseInt(line.substring(65, 75), 10);
        const productValue = parseFloat(line.substring(75, 87));
        const brutedate = line.substring(87, 95);
        const date = `${brutedate.substring(0, 4)}-${brutedate.substring(4, 6)}-${brutedate.substring(6, 8)}`

        if (!userGroup.has(userId)) {
            userGroup.set(userId, {
                user_id: userId,
                name: userName,
                orders: new Map(),
            })
        }

        const user = userGroup.get(userId);

        if (!user.orders.has(orderId)) {
            user.orders.set(orderId, {
                order_id: orderId,
                date: date,
                products: [],
                total: 0,
            })
        }

        const order = user.orders.get(orderId);
        order.products.push({
            product_id: productId,
            value: productValue.toFixed(2),
        });
    }

    const result = [];

    for (const user of userGroup.values()) {
        user.orders = Array.from(user.orders.values()).map(order => {
            const total = order.products.reduce((sum, product) => sum + parseFloat(product.value), 0);
            order.total = total.toFixed(2);
            return order;
        })
        result.push(user)
    }
    return result;
}

module.exports = {
    parseAndGroupData
}