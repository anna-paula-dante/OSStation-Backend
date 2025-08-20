const express = require('express');
const multer = require('multer')

const fileController = require('../controllers/file.controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileController.processFile);

module.exports = router;