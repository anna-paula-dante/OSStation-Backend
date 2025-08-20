const express = require('express');
const multer = require('multer')

const fileController = require('../controllers/file.controller');
const orderController = require('../controllers/order.controller')

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileController.processFile);
router.get('/orders', orderController.getOrders)

module.exports = router;