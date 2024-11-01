// routes/meterReaderRoutes.js
const express = require('express');
const router = express.Router();
const meterReaderController = require('../controllers/meterReaderController');

// Route to display all meter readers
router.get('/', meterReaderController.getAllMeterReaders);

// Route to get a specific meter reader by ID
router.get('/:id', meterReaderController.getMeterReaderById);

// Additional routes for create, update, delete

module.exports = router;