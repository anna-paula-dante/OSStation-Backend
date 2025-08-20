const orderService = require('../services/order.service');

const getOrders = async (req, res, next) => {
    try {
        const filters = {
            orderId: req.query.order_id,
            startDate: req.query.start_date,
            endDate: req.query.end_date,
        }

        const orders = await orderService.findOrders(filters);
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getOrders
}