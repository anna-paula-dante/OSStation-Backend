const orderService = require('../services/order.service');

const processFile = async (req, res, next) => {
    try {
        console.log(req.file.buffer)
        if (!req.file) {
            return res.status(400).json({ message: 'Arquivo não enviado.' });
        }
        await orderService.processAndSave(req.file.buffer);
        res.status(201).json({ message: 'Arquivo processado com sucesso!' });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    processFile
}